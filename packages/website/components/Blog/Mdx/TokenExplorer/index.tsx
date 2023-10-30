import React, { useState } from "react";
import { InputGroup, List, ListItem, RadioButton, Text } from "@wfp/react";

import tokens from "@wfp/themes-core/dist/json/variables-full.json";

import styles from "./typeset.module.scss";

interface DesignToken {
  value?: DesignValue;
  type?: string;
  [key: string]: DesignToken | string | DesignValue | undefined;
}

interface TokenDisplayProps {
  name: string;
  token: DesignToken;
  depth?: number;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ name, token, depth }) => {
  if (depth > 3) return null;
  if (token.value) {
    return (
      <div className={styles.token}>
        <strong className="token-name">{name}:</strong>
        <span className="token-value">
          {typeof token.value === "string" && token.value}
        </span>
      </div>
    );
  }

  return (
    <div className="token-category">
      <h2 className="category-name">{name}</h2>
      {typeof token === "object" && (
        <div className="nested-tokens">
          {Object.entries(token).map(([nestedName, nestedToken]) => {
            //console.log("nestedToken", nestedToken);

            return (
              <TokenDisplay
                key={nestedName}
                name={nestedName}
                depth={depth + 1}
                token={nestedToken as DesignToken}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

interface DesignTokenProps {
  tokens: Record<string, DesignToken>;
}

const DesignTokenDisplay: React.FC<DesignTokenProps> = ({ tokens }) => {
  return (
    <div className="design-tokens">
      {Object.entries(tokens).map(([tokenName, tokenData]) => (
        <TokenDisplay key={tokenName} name={tokenName} token={tokenData} />
      ))}
    </div>
  );
};
// extended logo versions are removed from documentation based on recommendations from CAM, but they still exist in assets for developers already using them in their code.
export default function Typeset() {
  return (
    <div>
      <DesignTokenDisplay tokens={tokens} />
      {/* typesetList */}
    </div>
  );
}
