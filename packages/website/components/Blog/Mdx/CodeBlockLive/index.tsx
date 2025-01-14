/* eslint-disable no-irregular-whitespace */
// src/components/CodeBlock.js
import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import stylesModule from "./codeBlockLive.module.scss";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  withLive,
} from "react-live";
import Storybook from "../Storybook";
import { DoUse, DoNotUse } from "../DoUse";
//import { MDXProvider } from '@mdx-js/react';
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

//import MDX from '@mdx-js/runtime';
//import components from '../';

import * as ReactDOMServer from "react-dom/server";

import * as unComponents from "@wfp/react";
import * as unHumanitarianIcons from "@wfp/humanitarian-icons-react";
import * as unPictograms from "@wfp/pictograms-react";
import * as icons from "@wfp/icons-react";
import { Button, Empty } from "@wfp/react";
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";
import htmlParser from "prettier/parser-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";

const countLines = (str) => {
  return str.split("\n").length;
};

function LiveHtml({ live }: any /* { live?: Record<string, unknown> } */) {
  // const Result = live.element as React.FunctionComponent | React.ComponentClass;
  //const Result = live.element as React.ElementType;
  //if (!Result) return null;
  // let htmlString = ReactDOMServer.renderToStaticMarkup(<Result />);
  let htmlString = ReactDOMServer.renderToStaticMarkup(<live.element />);

  htmlString = htmlString.replace(
    /<svg.*?>(.*?)<\/svg>/gm,
    "<YOUR SVG IMAGE />"
  ); // $1p

  let formatedHtmlString = htmlString;
  try {
    formatedHtmlString = prettier.format(htmlString, {
      parser: "html",
      plugins: [htmlParser],
    });
  } catch (e) {
    console.log(e);
  }

  return <CodeBlock language="html">{formatedHtmlString}</CodeBlock>;
}
const LiveHtmlHoc = withLive(LiveHtml);

const CodeBlockLive = (props: any) => {
  const {
    children,
    className = "",
    live,
    center,
    forceFullWidth,
    hideWrapper,
    noInline,
    showEditor = true,
    view,
    source,
    width,
    expandCode,
    reactHookForm,
  } = props;
  const [showHtml, setShowHtml] = useState(false);
  const [showCode, setShowCode] = useState(showEditor);
  const [showAllCode, setShowAllCode] = useState(expandCode);
  // const [showExpandButton, setShowExpandButtons] = useState(true);
  const [rtl, setRtl] = useState(false);
  let code = source ? source : children ? children.trim() : "";

  if (reactHookForm)
    code = `
  const Counter = () => {

    const [defaultValues, setDefaultValues] = useState({"inputname":true});
    const { control, register, handleSubmit, watch, reset } = useForm({defaultValues});
    const [data, setData] = useState("");

    const setDefaultValuesFunc = (e) => {
      console.log(e.target.value);
      try {
        const values = JSON.parse(e.target.value);
        setDefaultValues(values);
      } catch (e) {
        console.log(e);
      }
    }

    const resetInputs = () => {
      reset(defaultValues);
    }
    const currentValues = watch();
  
    return (
      <>
      <TextInput name="default values" labelText="Default values" defaultValue={JSON.stringify(defaultValues)} onChange={setDefaultValuesFunc} /> 
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>

        ${code}
  
        <Button type="submit">Submit</Button>{" "}
        <Button onClick={resetInputs} kind="tertiary">Reset</Button>

        <h4>Submitted form data</h4>
        <p>{data}</p>

        <h4>Current values</h4>
        <p>{JSON.stringify(currentValues)}</p>

      </form>
      </>
    );
  }
  
  render(<Counter />)`;

  const language =
    props.language || className.replace(/language-/, "") || "jsx";

  const [copiedCode, setCopiedCode] = useState("Copy code");

  const cleanCode = (code) => {
    return `${code}` // don't modify the original value
      .replaceAll(/^import \{[^{]+\} from .+$\n/gm, "") // import { x, y } from "z"
      .replaceAll(/^import \* as \S+ from .+$\n/gm, "") // import * as abc from "z"
      .replaceAll(/: \S+ = /g, " = "); // let a: string = "something"
  };

  let formatedCode = code;

  try {
    formatedCode =
      language === "jsx" || 1 === 1
        ? prettier.format(code, {
            parser: "babel",
            plugins: [babelParser],
            printWidth: 55,
          })
        : code;
  } catch (error) {
    //console.log("prettier not working");
  }

  const handleCopyCode = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);

    setCopiedCode("Copied!");

    setTimeout(() => {
      setCopiedCode("Copy code");
    }, 2000);
  };

  if (live) {
    const scope = {
      ...unHumanitarianIcons,
      ...unPictograms,
      ...icons,
      ...unComponents,
      useForm,
      useState,
      Storybook,
      Controller,
      Empty,
      DoUse,
      DoNotUse,
    };

    const showExpandButton = countLines(formatedCode) > 12;

    const codeBlockClasses = classNames(stylesModule.editor, {
      btn: true,
      [stylesModule.hideWrapper]: hideWrapper,
      [stylesModule.showWrapper]: !hideWrapper,
      [stylesModule.center]: center,
      [stylesModule.notCenter]: !center,
      [stylesModule.fullWidth]: forceFullWidth,
      [stylesModule.normalWidth]: !forceFullWidth,
      [stylesModule.expandCode]: showAllCode,
      [stylesModule.collapseCode]: !showAllCode,
      [stylesModule.showExpandButton]: showExpandButton,
      [stylesModule.rtl]: rtl,
      [`${stylesModule[view]}`]: view,
    });

    return (
      <div className={codeBlockClasses}>
        {view !== "smallPreview" && (
          <div className={stylesModule.buttons}>
            <Button
              className={stylesModule.showAllPropsButton}
              iconReverse
              icon={
                <FontAwesomeIcon icon={rtl ? faCheckSquare : faMinusSquare} />
              }
              onClick={() => setRtl(!rtl)}
            >
              RTL
            </Button>
            <Button
              className={stylesModule.showAllPropsButton}
              onClick={() => setShowCode(!showCode)}
              iconReverse
              icon={
                <FontAwesomeIcon
                  icon={showCode ? faCheckSquare : faMinusSquare}
                />
              }
            >
              code
            </Button>
            <Button
              className={stylesModule.showAllPropsButton}
              onClick={() => setShowHtml(!showHtml)}
              iconReverse
              icon={
                <FontAwesomeIcon
                  icon={showHtml ? faCheckSquare : faMinusSquare}
                />
              }
            >
              html
            </Button>
          </div>
        )}

        <LiveProvider
          code={formatedCode}
          scope={scope}
          theme={themes.vsDark}
          noInline={noInline || reactHookForm}
          transformCode={cleanCode}
        >
          {language === "mdx" || language === "md" ? (
            <div className={stylesModule.preview}>
              {/*<MDXProvider components={components}>
                <MDX>{code}</MDX>
          </MDXProvider> */}
            </div>
          ) : (
            <div className={stylesModule.previewWrapper}>
              <div className={stylesModule.previewInside}>
                <LivePreview
                  className={stylesModule.preview}
                  style={{ width: width ? width + "px" : undefined }}
                />
              </div>
            </div>
          )}

          {showCode && (
            <>
              <div className={stylesModule.liveEditor}>
                {showExpandButton && (
                  <div
                    className={stylesModule.showAllCodeWrapper}
                    onClick={() => setShowAllCode(!showAllCode)}
                  >
                    {showAllCode ? "Collapse code" : "Expand code"}
                  </div>
                )}
                <h3> Editable Example</h3>
                <LiveEditor theme={themes.vsDark} />
              </div>
              {language === "jsx" && showHtml && <LiveHtmlHoc />}
            </>
          )}
          <LiveError />
        </LiveProvider>
      </div>
    );
  }

  return (
    <div
      className={`${stylesModule.code} wfp--code-block ${
        source ? stylesModule.previewWithSource : ""
      }`}
    >
      {source && <div className={stylesModule.preview}>{children}</div>}
      {view !== "smallPreview" && (
        <Highlight
          code={code}
          language="tsx" //{language}
          theme={themes.vsDark}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, padding: "20px" }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )}
      <Button
        className={stylesModule.copyButton}
        small
        onClick={() => handleCopyCode(code)}
      >
        {copiedCode}
      </Button>
    </div>
  );
};
export default CodeBlockLive;

interface PreProps {
  live?: boolean;
  noInline?: boolean;
  reactHookForm?: boolean;
  forceFullWidth?: boolean;
  children?: /*| React.ReactElement<any, any>
    | JSX.Element
    | React.ReactFragment*/
  JSX.Element | { type: { name: string }; props: any };
  [x: string]: any;
}

export function Pre({
  live,
  noInline,
  reactHookForm,
  forceFullWidth,
  children,
  ...props
}: PreProps) {
  if (React.isValidElement(children) /*&& children?.type?.name === 'code'*/) {
    const childProps: any = children.props;

    return (
      <div {...props}>
        <CodeBlockLive
          live={live}
          noInline={noInline}
          reactHookForm={reactHookForm}
          forceFullWidth={forceFullWidth}
          {...childProps}
        />
      </div>
    );
  }
  // wfp--story__code
  const childObject: any = children;

  return <pre {...props}>{childObject}</pre>;
}

export function CodeBlock(params) {
  return <CodeBlockLive {...params} />;
}
