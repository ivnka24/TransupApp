import React, { useContext, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { instance as axios } from "../instance";
import { ContextStore } from "../store/ContextStore";

export function UpdateServiceModal({ open, onClose, serviceId }) {
  const { values, handleChange, handleSubmit, updateFormConfig } =
    useContext(ContextStore);
  const [localValues, setLocalValues] = useState({ debet: 0, kredit: 0 });

  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        try {
          const { data } = await axios.get(`service/${serviceId}`);

          setLocalValues({
            debet: data.data.debet || "",
            kredit: data.data.kredit || "",
          });
        } catch (error) {
          console.error("Failed to fetch service details:", error);
        }
      };
      fetchService();
    }
  }, [serviceId]);

  const handleUpdate = async () => {
    try {
      const formattedValues = {
        debet: isNaN(localValues.debet) ? null : localValues.debet,
        kredit: isNaN(localValues.kredit) ? null : localValues.kredit,
      };
      await axios.put(`service/${serviceId}`, formattedValues);
      onClose();
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Service</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Debet"
          type="number"
          fullWidth
          variant="standard"
          value={localValues.debet}
          onChange={(e) => {
            const value =
              e.target.value === "" ? 0 : parseInt(e.target.value, 10);
            setLocalValues({ ...localValues, debet: isNaN(value) ? 0 : value });
          }}
        />
        <TextField
          margin="dense"
          label="Kredit"
          type="number"
          fullWidth
          variant="standard"
          value={localValues.kredit}
          onChange={(e) => {
            const value =
              e.target.value === "" ? 0 : parseInt(e.target.value, 10);
            setLocalValues({
              ...localValues,
              kredit: isNaN(value) ? 0 : value,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
