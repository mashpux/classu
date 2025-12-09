"use client";

import React, { useState } from "react";
import { Key, DollarSign, Repeat, Server, Code, Send, RotateCcw, Lock } from "lucide-react";

import { CharactersSection } from "@/src/components/CharactersSection";

import { useTranslations } from "next-intl";

export const Nut03: React.FC = () => {
  const t = useTranslations("nut03");
  const t00 = useTranslations("nut00");

  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: t("Overview"), icon: "📚" },
    { id: "send", label: t("SendTitle"), icon: "💸" },
    { id: "receive", label: t("ReceiveTitle"), icon: "🎁" },
    { id: "example", label: t("Example"), icon: "📖" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">
          NUT-03: {t("subtitle")}
        </h2>
        <p className="text-lg opacity-90">
          L'operazione di swap è la componente più importante del sistema Cashu. Consiste in input multipli (`Proofs`) e output (`BlindedMessages`). I Mint verificano e invalidano gli input ed emettono nuove promesse (`BlindSignatures`).
        </p>
      </div>

      <CharactersSection />

      <div className="border-l-4 border-pink-500 p-6 rounded bg-gray-900/50">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-pink-400">
          <RotateCcw className="w-5 h-5" />
          Utilizzi dell'Operazione
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
            <li>`Alice` può usarla per dividere i suoi token in un importo di destinazione da inviare a `Carol`.</li>
            <li>Il wallet di `Carol` può usarla per ricevere token da `Alice` inviandoli come input al mint e ricevendo nuovi output in cambio.</li>
        </ul>
      </div>
    </div>
  );

  const renderSend = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Send className="w-6 h-6" />
        {t("SendTitle")}
      </h2>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <p className="text-gray-400 mb-3">{t("SendDesc")}</p>

        <h3 className="font-bold text-xl mb-3 text-pink-400 mt-4">
          {t("SendExampleTitle")}
        </h3>
        <p className="text-gray-400 mb-3">{t("SendExampleDetail")}</p>
      </div>

      <div className="bg-yellow-900/50 border-l-4 border-yellow-500 p-6 rounded">
        <h3 className="font-bold text-lg mb-2 text-yellow-400 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          {t("PrivacyNoteTitle")}
        </h3>
        <p className="text-gray-400">{t("PrivacyNoteDesc")}</p>
      </div>
    </div>
  );

  const renderReceive = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <DollarSign className="w-6 h-6" />
        {t("ReceiveTitle")}
      </h2>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <p className="text-gray-400 mb-3">{t("ReceiveDesc")}</p>
        <p className="text-gray-400 mt-3 text-sm">
          Per continuare l'esempio precedente: `Carol` richiede uno swap con input `Proofs` per un valore di `[32, 8]` per ricevere nuovi output con lo stesso importo totale.
        </p>
      </div>
    </div>
  );

  const renderExample = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Code className="w-6 h-6" />
        {t("Example")}
      </h2>

      {/* POST /v1/swap */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="bg-pink-600 text-white p-4">
          <h3 className="font-bold text-lg">{t("EndpointTitle")}</h3>
          <p className="text-sm opacity-90">{t("EndpointDesc")}</p>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-300 mb-2">
            {t00("endpoint_request_title")} (Alice):
          </h4>
          <code className="block bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400 mb-4">
            POST https://mint.host:3338/v1/swap
          </code>

          <h4 className="font-semibold text-gray-300 mb-2">
            {t("RequestTitle")}
          </h4>
          <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
            {`{
  "inputs": <Array[Proof]>,
  "outputs": <Array[BlindedMessage]>,
}`}
          </pre>
          <p className="mt-3 text-sm text-gray-400">{t("RequestDetail")}</p>

          <h4 className="font-semibold text-gray-300 mb-2 mt-4">
            {t("ExampleRequestTitle")} (JSON):
          </h4>
          <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
            {`{
  "inputs":
    [
      {
        "amount": 2,
        "id": "009a1f293253e41e",
        "secret": "407915bc212be61a77e3e6d2aeb4c727980bda51cd06a6afc29e2861768a7837",
        "C": "02bc9097997d81afb2cc7346b5e4345a9346bd2a506eb7958598a72f0cf85163ea"
      },
      {
      ...
      }
    ],
  "outputs":
    [
      {
        "amount": 2,
        "id": "009a1f293253e41e",
        "B_": "02634a2c2b34bec9e8a4aba4361f6bf202d7fa2365379b0840afe249a7a9d71239"
      },
      {
      ...
      }
    ]
}`}
          </pre>

          <h4 className="font-semibold text-gray-300 mb-2 mt-4">
            {t("ResponseTitle")} (Bob):
          </h4>
          <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
            {`{
  "signatures": <Array[BlindSignature]>
}`}
          </pre>
          <p className="mt-3 text-sm text-gray-400">{t("ResponseDetail")}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-red-400 via-pink-400 to-orange-400">
          NUT-03
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {t("MANDATORY")}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="rounded-lg p-2 mb-6 flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`cursor-pointer flex-1 min-w-[150px] px-4 py-3 rounded-lg font-semibold transition-all ${
              activeSection === section.id
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md"
                : "cursor-pointer p-6 rounded-xl border-2 transition-all transform hover:scale-105 text-white"
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-lg shadow-xl p-6 md:p-8 mb-8 bg-gray-900/70">
        {activeSection === "overview" && renderOverview()}
        {activeSection === "send" && renderSend()}
        {activeSection === "receive" && renderReceive()}
        {activeSection === "example" && renderExample()}
      </div>
    </>
  );
};

export default Nut03;