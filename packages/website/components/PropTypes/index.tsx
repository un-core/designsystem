import {
  Checkbox,
  Select,
  SelectItem,
  Table,
  Text,
  TextInput,
} from "@wfp/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as unComponents from "@wfp/react";

import reactElementToJSXString from "react-element-to-jsx-string";

import styles from "./prop-types.module.scss";
import CodeBlockLive from "../Blog/Mdx/CodeBlockLive";
import Markdown from "react-markdown";
import formatTypes from "./formatTypes";

import * as componentsSource from "@../../../demoCode/dist/bundle";

/*
const clean = (obj) => {
  for (const propName in obj) obj[propName] ?? delete obj[propName];
  return obj;
};*/

function extractJSX(code) {
  // Regular expression to match the pattern of the function and extract JSX
  const pattern = /const [\w]+ = \w+ => (.*);/s;
  if (!code) return null;
  const match = code.match(pattern);

  if (match && match[1]) {
    return match[1].trim();
  } else {
    return "Pattern not found";
  }
}

export default function PropTypes({
  defaultProps = {},
  mainComponent,

  components = [],
  //sampleCode: sampleCodeInput,
  //smallPreview,
  previewScale,
  propTypes,
  view,
}: any) {
  const [showAllProps /* , setShowAllProps */] = useState(true);

  const componentsSourceProps =
    componentsSource[mainComponent]?.default[
      `${propTypes?.displayName}DefaultArgs`
    ];

  const { register, watch, handleSubmit } = useForm({
    defaultValues: componentsSourceProps /* defaultProps */,
  });

  const componentsSourceText =
    componentsSource[mainComponent]?.default[
      `${propTypes?.displayName}Default`
    ];

  const sampleCode = extractJSX(componentsSourceText);

  /*     children?.props?.children?.props?.children || sampleCodeInput */ //if (!propTypes?.[0]) return null;
  const propList = propTypes?.props;

  console.log("componentsSourceddd", propList, componentsSourceProps);

  /*Object.entries(propList).forEach((prop) => {
    componentProps[prop.name] =
      propValues[prop.name] || prop.defaultValue?.value;
  });*/

  const propValues = watch();

  const onSubmit = (data) => {
    console.log(data);
  };

  const options = "primary | secondary | dsaasdads | saddsa".replaceAll(
    " ",
    ""
  );

  const renderInput = (prop) => {
    if (prop.type.name === "ButtonKind") {
      return (
        <Select
          {...register(prop.name, { required: prop.required })}
          defaultValue={prop.defaultValue && prop.defaultValue.value}
        >
          {Object.values(options.split("|")).map((kind, i) => (
            <SelectItem key={i} value={kind} text={kind} />
          ))}
        </Select>
      );
    }
    if (
      prop.type.name === "ReactNode" ||
      prop.type.name === "string" ||
      prop.type.name === "number"
    ) {
      return (
        <TextInput
          {...register(prop.name, { required: prop.required })}
          type={prop.type.name === "number" ? "number" : "text"}
          defaultValue={prop.defaultValue && prop.defaultValue.value}
        />
      );
    } else if (prop.type.name === "boolean") {
      return (
        <Checkbox
          {...register(prop.name)}
          labelText={prop.name}
          type="checkbox"
          defaultChecked={prop.defaultValue && prop.defaultValue.value}
        />
      );
    }
    // Add more input types based on prop types if needed
  };

  const componentProps = {};
  if (propList) {
    Object.values(propList).forEach(({ name, defaultValue }: any) => {
      componentProps[name] = propValues[name] || defaultValue?.value;
    });
  }

  const MyComponent = unComponents[mainComponent];
  if (!MyComponent) return null;

  let propsAsList: any = [];

  if (propList) {
    propsAsList =
      /*= showAllProps
      ? Object.values(propList).filter((e: any) =>
          e.description.includes("@design")
        )
      : */ Object.values(propList);
  }

  let code = reactElementToJSXString(
    <MyComponent {...defaultProps} {...componentProps} />,
    { filterProps: (val) => (val === undefined ? false : true) }
  );

  if (sampleCode) {
    const codeFiltered = reactElementToJSXString(
      <MyComponent
        // {...defaultProps}
        {...componentProps}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />,
      { filterProps: (val) => (val === undefined ? false : true) }
    )
      .replace(`<${mainComponent}`, ``)
      .replace(`/>`, ``);

    code = sampleCode
      .replace("PROPS_HERE", codeFiltered)
      .replace("{...args}", codeFiltered);
  }
  const componentList = [mainComponent, ...components].join(", ");
  code = `import { ${componentList} } from "@wfp/react";


() => { 
  const action = () => {}; return (${code})}`;

  console.log("code", MyComponent, code);

  if (view === "smallPreview") {
    return (
      <div
        className={styles.smallPreviewWrapper}
        style={{
          width: `${(1 / previewScale) * 100}%`,
          left: `-${(1 / previewScale) * 50 - 50}%`,
          transform: ` scale(${previewScale})`,
        }}
      >
        <CodeBlockLive
          source={code}
          live
          hideWrapper
          center
          smallPreview
          showEditor={!showAllProps}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.preview} ${
        view === "smallPreview" ? styles.smallPreview : styles.normalPreview
      }`}
    >
      <CodeBlockLive
        source={code}
        live
        hideWrapper
        center
        view={view}
        showEditor={!showAllProps}
      />
      {/*
        <div className={styles.previewWrapper}>
          <MyComponent {...defaultProps} {...componentProps} />
        </div>
  )}*/}
      {/*view !== "smallPreview" && (
        <Button
          kind="ghost"
          className={styles.showAllPropsButton}
          onClick={() => setShowAllProps(!showAllProps)}
        >
          {showAllProps && view !== "propTable" ? "Show" : "Hide"} all props
        </Button>
      )*/}
      {view === "propsTable" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {view === "propsTable" && (
            <Table className={styles.propTable}>
              <thead>
                <tr>
                  <th>Prop</th>

                  <th>Default</th>
                  <th>Description</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {propsAsList.map((prop: any) => {
                  console.log(
                    "formatTypes(prop.type.name)",
                    formatTypes(prop.type.name)
                  );

                  return (
                    <tr key={prop.name}>
                      <td>
                        <h3 className={styles.propName}>{prop.name}</h3>

                        <Text kind="code" className={styles.types}>
                          {formatTypes(prop.type.name).map(
                            (line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            )
                          )}
                        </Text>
                      </td>

                      <td>
                        {prop.defaultValue ? prop.defaultValue.value : "–"}
                      </td>

                      <td>
                        <Markdown>
                          {prop.description
                            .replace("@design", "")
                            .replaceAll("\\", "")}
                        </Markdown>

                        {prop.defaultValue && (
                          <div>default: {prop.defaultValue.value}</div>
                        )}
                      </td>
                      <td>{renderInput(prop)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </form>
      )}
    </div>
  );
}
