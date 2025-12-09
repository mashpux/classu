"use client";

import React, { useState } from "react";
import { Key, DollarSign, Repeat, Server, Code, FileText, Lock, Calculator, Zap } from "lucide-react";

import { CharactersSection } from "@/src/components/CharactersSection";

import { useTranslations } from "next-intl";

export const Nut02: React.FC = () => {
  const t = useTranslations("nut02");
  const t00 = useTranslations("nut00");

  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: t("Overview"), icon: "📚" },
    { id: "properties", label: t("KeysetProperties"), icon: "⚙️" },
    { id: "fees", label: t("FeesTitle"), icon: "💰" },
    { id: "derivation", label: t("DerivingIDTitle"), icon: "🔢" },
    { id: "endpoints", label: t("Endpoint"), icon: "💻" },
    { id: "notes", label: t("ImplementationNotes"), icon: "📝" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">
          NUT-02: {t("subtitle")}
        </h2>
        <p className="text-lg opacity-90">
          {/* Un keyset è un insieme di chiavi pubbliche generate e condivise dal mint `Bob` con i suoi utenti. Indica le chiavi pubbliche che corrispondono ai valori di importo supportati dal mint (es. `1, 2, 4, 8, ...`). */}
			{t("description_detail")}
        </p>
      </div>

      <CharactersSection />

      <div className="border-l-4 border-indigo-500 p-6 rounded bg-gray-900/50">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-indigo-400">
          <Repeat className="w-5 h-5" />
          {t00("Protocol Foundation")}
        </h3>
        <p className="text-gray-400">
          Ogni keyset include il suo `id`, l'unità di `unit`, lo stato `active` e una `input_fee_ppk` che determina le commissioni per spendere l'ecash. I wallet DEVONO supportare keyset multipli e rispettare le proprietà `active` e `input_fee_ppk`.
        </p>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Key className="w-6 h-6" />
        {t("KeysetProperties")}
      </h2>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="font-bold text-xl mb-2 text-indigo-400">
          {t("KeysetIDTitle")}
        </h3>
        <p className="text-gray-400 mb-3">{t("KeysetIDDesc")}</p>
        <p className="text-sm text-gray-500">
          L'ID del keyset è presente in ogni `Proof` e nel `BlindedMessages` inviato al mint e nel `BlindSignatures` restituito (vedi [NUT-00][00]).
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="font-bold text-xl mb-2 text-indigo-400">
          {t("ActiveKeysetsTitle")}
        </h3>
        <p className="text-gray-400 mb-3">{t("ActiveKeysetsDesc1")}</p>
        <p className="text-gray-400 mb-3">{t("ActiveKeysetsDesc2")}</p>
        <p className="text-sm text-gray-500">
          Per ruotare i keyset, un mint può generare un nuovo keyset attivo e disattivare uno vecchio. Se il flag `active` è `false`, non può essere generato nuovo ecash, ma i `Proofs` in sospeso sono ancora accettati come input.
        </p>
      </div>
    </div>
  );

  const renderFees = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <DollarSign className="w-6 h-6" />
        {t("FeesTitle")}
      </h2>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="font-bold text-xl mb-2 text-indigo-400">
          {t("FeesTitle")}
        </h3>
        <p className="text-gray-400 mb-3">{t("FeesDesc")}</p>
        <p className="text-gray-400 mb-3">
            {t("FeeExampleDetail")}
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="font-bold text-xl mb-2 text-indigo-400">
          {t("TxConstructionTitle")}
        </h3>
        <p className="text-gray-400 mb-3">{t("TxConstructionDesc")}</p>

        <h4 className="font-semibold text-gray-300 mb-2 mt-4">
          Equazione di verifica del Mint:
        </h4>
        <code className="block bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400 mb-4">
          sum(inputs) - fees == sum(outputs)
        </code>

        <h4 className="font-semibold text-gray-300 mb-2 mt-4">
          {t("FeeFormulaTitle")}
        </h4>
        <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
          {`def fees(inputs: List[Proof]) -> int:
  sum_fees = 0
  for proof in inputs:
    sum_fees += keysets[proof.id].input_fee_ppk
  return (sum_fees + 999) // 1000`}
        </pre>
        <p className="mt-3 text-sm text-gray-500">
          L'operatore `//` denota una divisione intera che arrotonda per difetto. Alternativamente, si potrebbe usare `ceil(sum_fees / 1000)`.
        </p>
      </div>
    </div>
  );

  const renderDerivation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Calculator className="w-6 h-6" />
        {t("DerivingIDTitle")}
      </h2>
      
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="font-bold text-xl mb-2 text-indigo-400">
          {t("DerivingIDTitle")}
        </h3>
        <p className="text-gray-400 mb-3">{t("DerivingIDDesc")}</p>

        <h4 className="font-semibold text-gray-300 mb-2 mt-4">
          Passaggi per la derivazione:
        </h4>
        <ol className="list-decimal list-inside space-y-1 text-gray-400 ml-4 mb-4">
            <li>ordinare le chiavi pubbliche per importo in ordine crescente</li>
            <li>concatenare tutte le chiavi pubbliche in un unico array di byte</li>
            <li>HASH_SHA256 delle chiavi pubbliche concatenate</li>
            <li>prendere i primi 14 caratteri dell'hash codificato in esadecimale</li>
            <li>prefiggerlo con un byte di versione dell'ID del keyset ('00')</li>
        </ol>

        <h4 className="font-semibold text-gray-300 mb-2 mt-4">
          Esempio di implementazione Python:
        </h4>
        <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
          {`def derive_keyset_id(keys: Dict[int, PublicKey]) -> str:
    sorted_keys = dict(sorted(keys.items()))
    pubkeys_concat = b"".join([p.serialize() for p in sorted_keys.values()])
    return "00" + hashlib.sha256(pubkeys_concat).hexdigest()[:14]`}
        </pre>
      </div>
    </div>
  );

  const renderEndpoints = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Server className="w-6 h-6" />
        {t("Endpoint")}
      </h2>

      {/* GET /v1/keysets */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="bg-indigo-600 text-white p-4">
          <h3 className="font-bold text-lg">{t("GetKeysetsEndpointTitle")}</h3>
          <p className="text-sm opacity-90">{t("GetKeysetsEndpointDesc")}</p>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-300 mb-2">
            {t00("endpoint_request_title")} (Alice)
          </h4>
          <code className="block bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400 mb-4">
            GET https://mint.host:3338/v1/keysets
          </code>

          <h4 className="font-semibold text-gray-300 mb-2">
            {t00("endpoint_response_title")} (GetKeysetsResponse)
          </h4>
          <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
            {`{
  "keysets": [
    {
      "id": <hex_str>,
      "unit": <str>,
      "active": <bool>,
      "input_fee_ppk": <int|null>,
    },
    ...
  ]
}`}
          </pre>
          <p className="mt-3 text-sm text-gray-400">{t("ResponseDetailKeysets")}</p>
        </div>
      </div>
      
      {/* Example Response */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="font-bold text-xl mb-3 text-indigo-400">
          {t("ExampleResponseTitle")}
        </h3>
        <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
          {`{
  "keysets": [
    {
      "id": "009a1f293253e41e",
      "unit": "sat",
      "active": true,
      "input_fee_ppk": 100
    },
    {
      "id": "0042ade98b2a370a",
      "unit": "sat",
      "active": false,
      "input_fee_ppk": 100
    },
    {
      "id": "00c074b96c7e2b0e",
      "unit": "usd",
      "active": true,
      "input_fee_ppk": 100
    }
  ]
}`}
        </pre>
      </div>

      {/* GET /v1/keys/{keyset_id} */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="bg-indigo-600 text-white p-4">
          <h3 className="font-bold text-lg">{t("GetKeysEndpointTitle")}</h3>
          <p className="text-sm opacity-90">{t("GetKeysEndpointDesc")}</p>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-300 mb-2">
            Esempio di richiesta (Alice):
          </h4>
          <code className="block bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400 mb-4">
            GET https://mint.host:3338/v1/keys/009a1f293253e41e
          </code>
          <p className="mt-3 text-sm text-gray-400">
            La risposta è la stessa dell'endpoint `GET /v1/keys` descritto in NUT-01.
          </p>
        </div>
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6" />
        {t("ImplementationNotes")}
      </h2>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <p className="text-gray-400 mb-4">
          I Wallet possono richiedere l'elenco degli ID dei keyset dal mint all'avvio per caricare solo i token supportati e per determinare se un keyset è stato aggiunto o se il flag `active` è cambiato.
        </p>

        <h3 className="font-bold text-xl mb-3 text-indigo-400">
          {t("ImplementationFlowTitle")}
        </h3>

        <ol className="list-decimal list-inside space-y-3 text-gray-400 ml-4">
          <li>
            {t("ImplementationFlow_1")}
          </li>
          <li>
            {t("ImplementationFlow_2")}
          </li>
          <li>
            {t("ImplementationFlow_3")}
          </li>
          <li>
            {t("ImplementationFlow_4")}
          </li>
        </ol>
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-indigo-400 to-pink-400">
          NUT-02
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
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
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
        {activeSection === "properties" && renderProperties()}
        {activeSection === "fees" && renderFees()}
        {activeSection === "derivation" && renderDerivation()}
        {activeSection === "endpoints" && renderEndpoints()}
        {activeSection === "notes" && renderNotes()}
      </div>
    </>
  );
};

export default Nut02;