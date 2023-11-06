import React from "react";
import { List, ListItem, Text, Tooltip, tooltipStyle } from "@wfp/react";

import tokens from "@wfp/themes-core/dist/json/variables-full.json";

import styles from "./typeset.module.scss";

function deepFilter(obj) {
  // Base case: If the current object has the desired property and value, return the object
  if (
    obj &&
    typeof obj === "object" &&
    obj.filePath === "tokens/design-tokens.tokens.new.json"
  ) {
    return obj;
  }

  if (obj && typeof obj === "object") {
    let newObj = Array.isArray(obj) ? [] : {};
    let hasValidChildren = false;

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const child = deepFilter(obj[key]);
        if (child !== null) {
          newObj[key] = child;
          hasValidChildren = true;
        }
      }
    }

    if (hasValidChildren) return newObj;
  }

  return null;
}

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

const TokenDisplaySmall: React.FC<TokenDisplayProps> = ({
  name,
  token,
  depth = 0,
}) => {
  if (depth > 3) return null;

  // if (token.filePath === "tokens/design-tokens.tokens.new.json")
  //  return <div>hello{token.filePath}</div>;

  if (
    token.value &&
    token.filePath === "tokens/design-tokens.tokens.new.json"
  ) {
    return (
      <Tooltip
        interactive
        className={styles.tooltip}
        content={
          <div className={styles.tooltip}>
            <div className={styles.name}>{token.name}</div>
            <List kind="simple" colon className={styles.list}>
              <ListItem title="Value">
                {typeof token.value === "string"
                  ? token.value
                  : JSON.stringify(token.value, null, 2)}
              </ListItem>
              <ListItem title="CSS">
                <Text kind="code" spacingTop="none">
                  {token.cssName}
                </Text>
              </ListItem>

              <ListItem title="path">
                <Text kind="code" spacingTop="none">
                  {token.path.join(" > ")}
                </Text>
              </ListItem>

              <ListItem title="Type">
                <Text kind="code" spacingTop="none">
                  {token.type}
                </Text>
              </ListItem>

              <ListItem title="Original">
                <Text kind="code" spacingTop="none">
                  {typeof token.original.value === "string"
                    ? token.original.value
                    : JSON.stringify(token.original.value, null, 2)}
                </Text>
              </ListItem>

              {/* <ListItem title="CSS" className={styles.raw}>
                {JSON.stringify(token, null, 2)}
        </ListItem> */}
            </List>
          </div>
        }
        trigger="click"
        {...tooltipStyle}
      >
        <div className={styles.token}>
          <div className={styles.preview}>
            {token.type === "color" ? (
              <div
                className={styles.color}
                style={{ backgroundColor: token.value as string }}
              />
            ) : (
              <div className={styles.value}>{name}</div>
            )}
          </div>
        </div>
      </Tooltip>
    );
  }
};

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  name,
  token,
  depth = 0,
}) => {
  if (depth > 3) return null;

  // if (token.filePath === "tokens/design-tokens.tokens.new.json")
  //  return <div>hello{token.filePath}</div>;

  if (
    token.value &&
    token.filePath === "tokens/design-tokens.tokens.new.json"
  ) {
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
                {token.filePath}
              </Text>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }

  // if (typeof token === "object")
  console.log(
    "tokenqqqqqq",
    token,
    Object.entries(token),
    Object.values(token)[0]?.name?.endsWith("10")[1] === "10"
  );

  /*if (Object.values(token).find((t) => t?.name?.endsWith("10"))) {
    return <div>Colorrange</div>;
  }

  if (name === "fontFamily") {
    return <div>FontFamily</div>;
  }

  if (name === "lineHeight") {
    return <div>LineHeight</div>;
  }

  if (name === "fontWeight") {
    return <div>FontWeight</div>;
  } */

  if (
    name === "spacing" ||
    name === "borderWidth" ||
    name === "borderRadius" ||
    name === "Desktop" ||
    name === "Mobile" ||
    name === "Action" ||
    name === "Focus" ||
    name === "Error" ||
    name === "BoxShadow" ||
    Object.values(token)[0]?.value
  ) {
    return (
      <div>
        <h5>{name}</h5>

        <div className={styles.smallTokens}>
          {Object.entries(token).map(([nestedName, nestedToken]) => {
            return (
              <TokenDisplaySmall
                key={nestedName}
                name={nestedName}
                depth={depth + 1}
                token={nestedToken as DesignToken}
              />
            );
          })}
        </div>
      </div>
    );
  }

  /*if (name === "fontSize") {
    return (
      <div>
        <h3>FontSize</h3>
        {Object.entries(token).map(([nestedName, nestedToken]) => {
          return (
            <TokenDisplaySmall
              key={nestedName}
              name={nestedName}
              depth={depth + 1}
              token={nestedToken as DesignToken}
            />
          );
        })}
      </div>
    );
  }*/

  if (name === "letterSpacing") {
    return <div>LetterSpacing</div>;
  }

  return (
    <div className="token-category">
      <h1>{name}</h1>
      {typeof token === "object" && (
        <div className={styles.nestedTokens}>
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
  console.log("tokensssss", tokens);
  return (
    <div className="design-tokens">
      {Object.entries(tokens).map(([tokenName, tokenData]) => {
        //if (typeof nestedToken === "string") return null;
        console.log("nestedLogssss", tokenData);
        /* if (nestedToken?.[0]?.name?.split("-")?.[1] === "10") {
  return <div></div>;
} */

        return (
          <TokenDisplay key={tokenName} name={tokenName} token={tokenData} />
        );
      })}
    </div>
  );
};
// extended logo versions are removed from documentation based on recommendations from CAM, but they still exist in assets for developers already using them in their code.
export default function Typeset() {
  return (
    <div>
      <DesignTokenDisplay tokens={deepFilter(tokens)} />
      {/* typesetList */}
    </div>
  );
}
