import React from 'react';
import { Copy } from 'lucide-react'; // Assumendo lucide-react per l'icona

interface CodeBlockProps {
  /** La stringa di codice da visualizzare. */
  code: string;
  /** Il linguaggio (es. 'json', 'bash', 'http') per l'etichetta. */
  language: string;
  /** Classi CSS opzionali per il container. */
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, className = '' }) => {
  // Funzione per copiare il codice
  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(code);
        // È possibile sostituire questo alert con un toast o una notifica
        console.log('Codice copiato!');
    }
  };

  return (
    <div className={`
      relative bg-gray-900 border border-gray-700 rounded-lg p-4
      font-mono text-sm shadow-xl
      ${className}
    `}>
      <header className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
        {/* Etichetta del linguaggio */}
        <span className="
          text-xs font-semibold uppercase
          px-2 py-0.5 rounded
          bg-blue-900/50 text-blue-300
        ">
          {language}
        </span>
        {/* Pulsante Copia */}
        <button
          className="flex items-center text-xs text-gray-400 hover:text-white transition-colors"
          onClick={handleCopy}
        >
          <Copy className="inline w-3 h-3 mr-1" />
          Copia
        </button>
      </header>
      {/* Contenitore del codice */}
      <pre className="
        overflow-x-auto whitespace-pre-wrap break-words
        text-gray-300
      ">
        {code}
      </pre>
    </div>
  );
};

export default CodeBlock;