import { useState } from "react";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Apa Saja Fasilitas Sewa Motornya?",
      answer: (
        <ul className="list-disc ml-6">
          <li>Unit Motor (Scooter)</li>
          <li>1 Bar Bensin (1 Bar Gas)</li>
          <li>Surat Motor (Scooter License Letter)</li>
          <li>Helm (Helmet)</li>
          <li>Masker (Mask)</li>
          <li>Jas Hujan (Rain Coat)</li>
        </ul>
      ),
    },
    {
      question: "Apa Saja Persyaratan Sewa Motornya?",
      answer: (
        <ul className="list-disc ml-6">
          <li>Memiliki SIM C aktif (Possess a valid driving license)</li>
          <li>Meninggalkan 2 identitas aktif (Leave 2 valid ID cards)</li>
          <li>
            Waktu balik motor paling lambat pukul 15.00 WIB (denda Rp.
            5,000/jam)
          </li>
          <li>Delivery Motor, fee menyesuaikan (Delivery fee varies)</li>
          <li>Booking jauh hari, DP minimal Rp. 50.000</li>
          <li>DP hangus jika tidak jadi atau tidak datang</li>
        </ul>
      ),
    },
    {
      question: "Apakah KTP Luar Kota bisa melakukan sewa?",
      answer:
        "Semua warga Negara Indonesia maupun mancanegara dapat melakukan dan menikmati layanan TransUp!",
    },
    {
      question: "Apakah Motor bisa di antar ke lokasi customer?",
      answer:
        "TransUp dapat melakukan Delivery unit ke lokasi Anda di Kota Probolinggo dengan fee berdasarkan jarak.",
    },
    {
      question: "Apakah motor bisa digunakan keluar Kota?",
      answer:
        "Pemakaian motor ke luar kota bisa dilakukan dengan biaya tambahan di atas biaya sewa.",
    },
    {
      question: "Bagaimana cara pembayaran sewa?",
      answer:
        "Pembayaran dapat dilakukan secara tunai saat pengambilan atau via transfer.",
    },
  ];

  return (
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white mt-4 shadow-lg" id="faq">
      {faqData.map((faq, index) => (
        <div key={index} className="p-6">
          <div
            className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
            onClick={() => toggleFaq(index)}
          >
            <h2 className="text-lg font-medium">{faq.question}</h2>
            <span className="relative size-5 shrink-0">
              {openIndex === index ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </span>
          </div>
          {openIndex === index && (
            <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
