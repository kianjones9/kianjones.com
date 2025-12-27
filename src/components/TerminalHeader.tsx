import { useState, useRef } from 'react';

export default function TerminalHeader() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // TODO: this could match the name of each visitor?
  const promptUser = "kian";
  // TODO: this should by default match the name of the site/CORS/referrer? i.e. kianjon.es vs kianjones.com?
  const promptHostname = "kianjon.es";
  // TODO: this should by default match the name of each page roughly
  const promptCwd = "~";

  return (
    <h1>
      <form className="terminalHeader" onClick={handleTerminalClick}>
        <div className="terminalPrompt">
          <div className="promptUser">{promptUser}</div>@
          <div className="promptHostname">{promptHostname}</div>:
          <div className="promptCwd">{promptCwd}</div>$ 
          <input
            ref={inputRef}
            className="terminalInput"
            type="text"
            name="form-field-name"
            value={input}
            autoComplete="off"
            style={{ width: `${Math.max(1, input.length || 1)}ch` }}
            onChange={(event) => setInput(event.target.value)}
          />
          <div className="cursor">▌</div>
        </div>
      </form>
    </h1>
  );
}
