import {
  Checkbox,
  Select,
  SelectItem,
  Empty,
  Tag,
  Table,
  Text,
  TextInput,
} from "@wfp/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as wfpComponents from "@wfp/react";

import reactElementToJSXString from "react-element-to-jsx-string";

import styles from "./prop-types.module.scss";
import CodeBlockLive from "../Blog/Mdx/CodeBlockLive";
import Markdown from "react-markdown";
import formatTypes from "./formatTypes";
import parse from "html-react-parser";
import { transform } from "@babel/standalone";
import { AddCircle, CloseCircle, Settings, StarSolid } from "@un/icons-react";

import * as componentsSource from "@../../../demoCode/dist/bundle";

const filterEmptyValues = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});
};
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

function extractJSXFromRender(code) {
  // Regular expression to match the pattern of the function and extract JSX
  const pattern = /\s*=>\s*(<.*>);?/s;
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
  componentsNew,
  showEditor,
  previewScale,
  name,
  propTypes,
  hideWrapper,
  view,
}: any) {
  // const [showAllProps, setShowAllProps] = useState(true);
  // const [rtl, setRtl] = useState(false);

  //console.log("componentsNew", name, propTypes, componentsNew);

  const currentComponentsSettings = componentsNew?.[propTypes?.displayName];

  const componentsSourceText =
    componentsSource[
      currentComponentsSettings?.demo
        ? currentComponentsSettings.demo
        : mainComponent
    ]?.default[`${propTypes?.displayName}Default`];

  const componentsSourceProps = componentsSourceText?.args
    ? componentsSourceText.args
    : componentsSource[mainComponent]?.default[
        `${propTypes?.displayName}DefaultArgs`
      ];

  const { register, watch, handleSubmit } = useForm({
    defaultValues: componentsSourceProps /* defaultProps */,
  });

  const sampleCode = componentsSourceText?.render
    ? extractJSXFromRender(componentsSourceText.render)
    : extractJSX(componentsSourceText);

  /*     children?.props?.children?.props?.children || sampleCodeInput */ //if (!propTypes?.[0]) return null;
  const propList = propTypes?.props;

  /*Object.entries(propList).forEach((prop) => {
    componentProps[prop.name] =
      propValues[prop.name] || prop.defaultValue?.value;
  });*/

  const propValues = watch();

  const onSubmit = (data) => {
    console.log(data);
  };

  const iconsList = {
    none: { value: "", icon: "No Icon" },
    AddCircle: { value: "AddCircle", icon: <AddCircle /> },
    CloseCircle: { value: "CloseCircle", icon: <CloseCircle /> },
    Settings: { value: "Settings", icon: <Settings /> },
    StarSolid: { value: "StarSolid", icon: <StarSolid /> },
  };

  // TODO: Add auto detection of options based on prop types
  const options = "primary | secondary | tertiary".replaceAll(" ", "");

  const renderInput = (prop) => {
    if (
      (prop.name === "kind" ||
        prop.name === "type" ||
        (prop.name === "size") | (prop.name === "pageWidth")) &&
      prop.type.name.includes("|")
    ) {
      //const propOptionsList = inputString.split(" | ").map(s => s.replace(/"/g, ''));

      return (
        <Select
          {...register(prop.name, { required: prop.required })}
          defaultValue={prop.defaultValue && prop.defaultValue.value}
        >
          {Object.values(prop.type.name.split("|")).map((kind: string, i) => (
            <SelectItem
              key={i}
              value={kind.replaceAll('"', "").replaceAll(" ", "")}
              text={kind.replaceAll('"', "").replaceAll(" ", "")}
            />
          ))}
        </Select>
      );
    }

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
    if (prop.name === "icon") {
      return (
        <Select
          {...register(prop.name, { required: prop.required })}
          defaultValue={prop.defaultValue && prop.defaultValue.value}
        >
          {Object.entries(iconsList).map(([i, icon]) => (
            <SelectItem key={i} value={icon.value} text={icon.value} />
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

  const componentProps: any = {};

  if (propList) {
    Object.values(propList).forEach(({ name, defaultValue }: any) => {
      if (name === "icon") {
        componentProps.icon = iconsList[propValues[name]]?.icon;
      } else {
        componentProps[name] = propValues[name] || defaultValue?.value;
      }
    });
  }

  const MyComponent = wfpComponents[mainComponent];
  if (!MyComponent) return null;

  let propsAsList: any = [];

  if (propList) {
    propsAsList = Object.values(propList);
  }

  let code = reactElementToJSXString(
    <MyComponent {...defaultProps} {...componentProps} />,
    { filterProps: (val) => (val === undefined ? false : true) }
  );

  if (sampleCode) {
    try {
      // Transpile JSX to JavaScript
      const transformedCode = transform(sampleCode.replace("{...args}", ""), {
        presets: ["react"],
      });

      // Evaluate the transpiled code to get a React element
      // WARNING: eval() can be dangerous and is generally not recommended.
      window.React = React;
      window.action = (action) => {
        console.log("action triggered", action);
      };
      Object.entries(wfpComponents).forEach((entry) => {
        window[entry[0]] = entry[1];
      });

      let codeNew = "";

      console.log("transformedCode.code", transformedCode.code);

      codeNew = eval(transformedCode.code);

      // .replace("{...args}", "")
      /*const options = {
      htmlparser2: {
        lowerCaseTags: false,
      },
    };

    const codeNew = parse(sampleCode.replace("{...args}", ""), options);*/

      const enhancedElement = React.cloneElement(codeNew, {
        ...filterEmptyValues(defaultProps),
        ...filterEmptyValues(componentProps),
      });

      code = reactElementToJSXString(enhancedElement);
    } catch (error) {
      console.log("Transform failed");
    }

    // console.log("codeNew", reactElementToJSXString(enhancedElement));
    /*const codeFiltered = reactElementToJSXString(
      <MyComponent
        {...defaultProps}
        {...componentProps}
        children={<div>ddsadsa</div>}
      />,
      { filterProps: (val) => (val === undefined ? false : true) }
    ); */
    // .replace(`<${mainComponent}`, ``)
    // .replace(`</${mainComponent}>`, ``);

    //code = codeFiltered
    /* sampleCode
      .replace("PROPS_HERE", codeFiltered)
      .replace("{...args}", codeFiltered) */
  }

  //if (componentProps.children) {
  //code = code.replace("/>", `</${mainComponent}>`);
  //  }

  // TODO: MainNavigation replace improve string replace
  /* code = code
    .replaceAll(`/>>`, `>`)
    .replaceAll(` /> />`, `/>`)
    .replaceAll(`/> />`, `/>`); */
  //.replaceAll(`/>`, ``);

  const componentsUsedInCode = [];
  Object.entries(wfpComponents).forEach(([index, c]) => {
    if (code.includes("<" + index)) {
      componentsUsedInCode.push(index);
    }
  });

  const componentList =
    /* [mainComponent, ...components] */ componentsUsedInCode.join(", ");

  code = `import { ${componentList} } from "@wfp/react";


() => { 
  ${
    code.search("action") !== -1 ? "const action = () => {};" : ""
  } return (${code})}`;

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
          // live
          width={componentsNew?.[propTypes?.displayName]?.width}
          hideWrapper={hideWrapper}
          center
          // smallPreview
          live
          view={view}
          showEditor={showEditor}
          // showEditor={!showAllProps}
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
        className={styles.codeBlock}
        live
        width={componentsNew?.[propTypes?.displayName]?.width}
        // hideWrapper
        center
        view={view}
        // showEditor={!showAllProps}
      />
      {/*
        <div className={styles.previewWrapper}>
          <MyComponent {...defaultProps} {...componentProps} />
        </div>
  )}*/}
      {view === "propsTable" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {view === "propsTable" && propsAsList.length > 0 ? (
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
                        {prop.description.includes("@deprecated") && (
                          <Tag type="warning" className={styles.deprecated}>
                            Deprecated
                          </Tag>
                        )}
                        <Markdown>
                          {prop.description
                            .replace("@design", "")
                            .replace("@deprecated", "")
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
          ) : view === "propsTable" ? (
            <Empty kind="large">
              This component does not have any custom props.
            </Empty>
          ) : null}
        </form>
      )}
    </div>
  );
}
