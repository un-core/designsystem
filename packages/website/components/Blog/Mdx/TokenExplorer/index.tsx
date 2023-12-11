import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  List,
  ListItem,
  Text,
  Tooltip,
  tooltipStyle,
} from "@wfp/react";

import tokens from "@wfp/themes-core/dist/json/variables-full.json";
import { hex, score } from "wcag-contrast";

import styles from "./typeset.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //  faChevronCircleRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function deepFilter(obj, category) {
  // Base case: If the current object has the desired property and value, return the object
  if (
    obj &&
    typeof obj === "object" &&
    obj.filePath === "tokens/design-tokens.tokens.new.json" &&
    (!category || obj.category === category)
  ) {
    return obj;
  }

  if (obj && typeof obj === "object") {
    const newObj = Array.isArray(obj) ? [] : {};
    let hasValidChildren = false;

    for (const key of Object.keys(obj)) {
      const child = deepFilter(obj[key], category);
      if (child !== null) {
        newObj[key] = child;
        hasValidChildren = true;
      }
    }

    if (hasValidChildren) return newObj;
  }

  return null;
}

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

interface Token {
  [key: string]: { value?: any };
}

function TokenDisplaySmall({ name, token, depth = 0 }: TokenDisplayProps) {
  if (depth > 4) return <div>Token not available</div>;

  if (
    token.value &&
    token.filePath === "tokens/design-tokens.tokens.new.json"
  ) {
    const tokenPath = token.path?.slice(0, -1);

    if (!tokenPath) return null;
    return (
      <Tooltip
        interactive
        className={styles.tooltip}
        content={
          <div className={styles.tooltip}>
            <div className={styles.tooltipPreview}>
              {token.type === "color" ? (
                <div
                  className={styles.tooltipColor}
                  style={{ backgroundColor: token.value as string }}
                >
                  <div className={styles.wcagScore}>
                    <div className={styles.wcagScoreLabelBlack}>
                      {score(hex("#000", token.value))}
                    </div>
                    <div className={styles.wcagScoreLabelWhite}>
                      {score(hex("#FFF", token.value))}
                    </div>
                  </div>
                </div>
              ) : typeof token.value === "object" && token.value.fontFamily ? (
                <div
                  className={styles.value}
                  style={{
                    fontFamily: token.value.fontFamily,
                    fontSize: token.value.fontSize + "px",
                    fontWeight: token.value.fontWeight,
                    lineHeight: token.value.lineHeight,
                    letterSpacing: token.value.letterSpacing,
                  }}
                >
                  {name}
                  <br /> <br />
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor.
                </div>
              ) : tokenPath.find((t) => t === "fontSize") ? (
                <div
                  className={styles.value}
                  style={{
                    fontSize: token.value + "px",
                  }}
                >
                  {name}
                </div>
              ) : tokenPath.find((t) => t === "letterSpacing") ? (
                <div
                  className={styles.value}
                  style={{
                    letterSpacing: token.value,
                  }}
                >
                  {name}
                </div>
              ) : tokenPath.find((t) => t === "borderRadius") ? (
                <div className={styles.value}>
                  {name}
                  <div
                    className={styles.borderRadius}
                    style={{
                      borderRadius: token.value,
                    }}
                  ></div>
                </div>
              ) : tokenPath.find((t) => t === "borderWidth") ? (
                <div className={styles.value}>
                  {name}
                  <div
                    className={styles.borderRadius}
                    style={{
                      borderWidth: token.value,
                    }}
                  ></div>
                </div>
              ) : tokenPath.find((t) => t === "fontWeight") ? (
                <div
                  className={styles.value}
                  style={{
                    fontWeight: token.value,
                  }}
                >
                  {name}
                </div>
              ) : tokenPath.find((t) => t === "fontFamily") ? (
                <div
                  className={styles.value}
                  style={{
                    fontFamily: token.value,
                  }}
                >
                  {name}
                </div>
              ) : (
                <div className={styles.value}>{name}</div>
              )}
            </div>
            <div>
              <Breadcrumb className={styles.breadcrumb}>
                {tokenPath.map((p, key) => (
                  <BreadcrumbItem key={key}>
                    <span>{p}</span>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
              <h3 className={styles.name}>{token.name}</h3>
              <p>{token.description}</p>
              <List kind="details" colon className={styles.list}>
                <ListItem title="Value">
                  {typeof token.value === "string" ? (
                    token.value
                  ) : (
                    <div className={styles.rawJson}>
                      {JSON.stringify(token.value, null, 2)}
                    </div>
                  )}
                </ListItem>
                <ListItem title="CSS">
                  <Text kind="code" spacingTop="none">
                    <div className={styles.rawJson}>
                      {token.cssName}

                      {typeof token.value === "object" && (
                        <>
                          {Object.entries(token.value).map(([i]) => (
                            <div key={i}>{`${token.cssName}__${i}`}</div>
                          ))}
                        </>
                      )}
                    </div>
                  </Text>
                </ListItem>

                {/* <ListItem title="Type">
                  <Text kind="code" spacingTop="none">
                    {token.type}
                  </Text>
                </ListItem> */}

                <ListItem title="Original">
                  <Text kind="code" spacingTop="none">
                    <div className={styles.rawJson}>
                      {typeof token.original.value === "string"
                        ? token.original.value
                        : JSON.stringify(token.original.value, null, 2)}{" "}
                    </div>
                  </Text>
                </ListItem>

                {/* <ListItem title="CSS" className={styles.raw}>
                {JSON.stringify(token, null, 2)}
        </ListItem> */}
              </List>
            </div>
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
  return null;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  name,
  token,
  depth = 0,
}: any) => {
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
          <h2>{name}</h2>

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
    /*  name === "spacing" ||
    name === "borderWidth" ||
    name === "borderRadius" ||
    name === "Desktop" ||
    name === "Mobile" ||
    name === "Action" ||
    name === "Focus" ||
    name === "Error" ||
    name === "BoxShadow" || */
    Object.values(token as Token)?.[0]?.value
  ) {
    return (
      <div className={styles.tokenCategory}>
        <h5 className={styles.tokenHeading}>{name}</h5>

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

  const isLastStep = (token as any)[Object.keys(token)[0]][
    Object.keys((token as any)[Object.keys(token)[0]])[0]
  ].filePath;
  const lastStepPath = (token as any)[Object.keys(token)[0]][
    Object.keys((token as any)[Object.keys(token)[0]])[0]
  ].path;

  const lastStepBreadcrumb = lastStepPath
    ? [...lastStepPath].splice(0, lastStepPath.length - 2)
    : [];
  return (
    <div className="token-category">
      <h4 className={styles.heading}>
        {isLastStep &&
          lastStepPath &&
          lastStepBreadcrumb.map((p, i) => (
            <span key={i}>
              {i !== 0 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={styles.chevron}
                />
              )}
              {p}
            </span>
          ))}
      </h4>
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
  return (
    <div className="design-tokens">
      {Object.entries(tokens).map(([tokenName, tokenData]) => {
        //if (typeof nestedToken === "string") return null;

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

interface TokenExplorerProps {
  category: string;
}

export default function TokenExplorer({ category }: TokenExplorerProps) {
  return (
    <div>
      <DesignTokenDisplay tokens={deepFilter(tokens, category)} />
    </div>
  );
}
