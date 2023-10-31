import React from "react";
import { List, ListItem, Text } from "@wfp/react";

import tokens from "@wfp/themes-core/dist/json/variables-full.json";

import styles from "./typeset.module.scss";

/*
interface DesignValue {
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  fontSize: string;
  letterSpacing: string;
}
*/

interface DesignToken {
  value?: any;
  type?: string;
  [key: string]: DesignToken | string | /*DesignValue | */ undefined | any;
}

interface TokenDisplayProps {
  name: string;
  token: any /* DesignToken */;
  depth?: number;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  name,
  token,
  depth = 0,
}) => {
  if (depth > 3) return null;
  if (token.value) {
    return (
      <div className={styles.token}>
        <div className={styles.preview}>
          {token.type === "color" && (
            <div
              className={styles.color}
              style={{ backgroundColor: token.value as string }}
            />
          )}
        </div>

        <div>
          <Text kind="h5" spacingTop="none">
            {name}
          </Text>

          <List kind="simple">
            <ListItem title="Value">
              {typeof token.value === "string" && token.value}
            </ListItem>
            <ListItem title="CSS">
              <Text kind="code" spacingTop="none">
                {token.cssName}
              </Text>
            </ListItem>
            <ListItem title="path">
              <Text kind="code" spacingTop="none">
                path here
              </Text>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }

  return (
    <div className="token-category">
      <Text kind="h2" spacingTop="none">
        {name}
      </Text>
      {typeof token === "object" && (
        <div className="nested-tokens">
          {Object.entries(token).map(([nestedName, nestedToken]) => {
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
