import React from 'react';
import './App.css';
import Form from '@rjsf/material-ui';
import { JSONSchema7 } from "json-schema";

const iriReferenceSchema: JSONSchema7 = {
  type: 'string',
  title: "IRI Reference",
}

const iriSchema: JSONSchema7 = {
  type: 'string',
  title: 'Internationalized Resource Identifier (IRI)'
}

const compactIriSchema: JSONSchema7 = {
  type: 'string',
  title: 'Compact IRI',
}

/**
 * via https://www.w3.org/TR/json-ld11/#context-definitions
 * A context definition MUST be a map whose keys MUST be either terms, compact IRIs, IRIs, or one of the keywords @base, @import, @language, @propagate, @protected, @type, @version, or @vocab. 
 */
const contextDefinitionSchema: JSONSchema7 = {
  type: "object",
  title: "JSON-LD Context Definition",
  // The value of keys that are not keywords MUST be either an IRI, a compact IRI, a term, a blank node identifier, a keyword, null, or an expanded term definition.
  additionalProperties: {
    title: "Context Definition non-keyword key/value",
    oneOf: [
      iriSchema,
      compactIriSchema,
      { type: 'string', title: 'term' },
      { type: 'string', title: 'blank node identifier' },
      { type: 'string', title: 'keyword', },
      { type: 'null', title: 'null' },
      // https://www.w3.org/TR/json-ld11/#dfn-expanded-term-definition
      { type: 'object', title: 'expanded term definition' },
    ]
  },
}

const jsonldContextItemSchema: JSONSchema7 = {
  title: "JSON-LD @context item",
  oneOf: [
    iriReferenceSchema,
    contextDefinitionSchema,
    { type: "null", title: 'Null', },
  ]
}

/**
 * via: https://www.w3.org/TR/json-ld11/#keywords
 * "The value of @context MUST be null, an IRI reference, a context definition, or an array composed of any of these."
 */
const jsonldContextSchema: JSONSchema7 = {
  oneOf: [
    jsonldContextItemSchema,
    {
      title: `Array of ${jsonldContextItemSchema.title}`,
      type: "array",
      items: jsonldContextItemSchema,
    }
  ]
}

const log = (type: string) => console.log.bind(console, type);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Narrator
        </a>
      </header>
      <section>
        <Form schema={jsonldContextSchema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")} />
      </section>
    </div>
  );
}

export default App;
