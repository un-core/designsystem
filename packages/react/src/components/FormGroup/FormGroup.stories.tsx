import React, { useState } from 'react';
import FormGroup from './FormGroup';
import TextInput from '../TextInput';
import NumberInput from '../NumberInput';
import CreatableSelect from 'react-select/creatable';
import markdown from './README.mdx';

export default {
  title: 'Components/Forms/FormGroup',
  component: FormGroup,
  parameters: {
    componentSubtitle: 'Component',
    status: 'released',
    mdx: markdown,
    showFeedback: true,
  },
};

export const Default = (args) => (
  <FormGroup {...args} className="wfp--form-long">
    <TextInput
      id="test11"
      labelText="Text Input label"
      placeholder="Placeholder text"
    />
    <TextInput
      id="test21"
      labelText="Text Input label"
      placeholder="Placeholder text"
    />
    <TextInput
      id="test31"
      labelText="Text Input label"
      placeholder="Placeholder text"
    />
  </FormGroup>
);
Default.args = {
  legendText: 'FormGroup heading',
};

const defaultsourcecode = `
import { FormGroup, TextInput } from "@un/react";

<FormGroup
  className="wfp--form-long"
  legendText="FormGroup heading"
>
  <TextInput
    id="test11"
    labelText="Text Input label"
    placeholder="Placeholder text"
  />
  <TextInput
    id="test21"
    labelText="Text Input label"
    placeholder="Placeholder text"
  />
  <TextInput
    id="test31"
    labelText="Text Input label"
    placeholder="Placeholder text"
  />
</FormGroup>
`;

Default.story = {
  parameters: {
    docs: {
      source: {
        code: defaultsourcecode,
      },
    },
  },
};

const options = [
  {
    value: 'afghanistan',
    label: 'Afghanistan (AF)',
  },
  {
    value: 'albania',
    label: 'Albania',
  },
  {
    value: 'algeria',
    label: 'Algeria',
  },
];

const cities = [
  {
    country: 'afghanistan',
    cityoptions: [
      { value: 'kabul', label: 'Kabul' },
      { value: 'kandahar', label: 'Kandahar' },
      { value: 'kerat', label: 'Herat' },
    ],
  },
  {
    country: 'albania',
    cityoptions: [
      { value: 'ballsh', label: 'ballsh' },
      { value: 'Fier', label: 'Fier' },
      { value: 'Labinot-Mal', label: 'Labinot-Mal' },
    ],
  },
  {
    country: 'algeria',
    cityoptions: [
      { value: 'algiers', label: 'Algiers' },
      { value: 'oran', label: 'Oran' },
      { value: 'constantine', label: 'Constantine' },
    ],
  },
];

export const AddressDetails = (args) => {
  const [cityoption, setcityoption] = useState(null);

  const handleChange = (newValue) => {
    const selectedCountry = cities.find(
      (city) => city.country === newValue.value
    );
    setcityoption(selectedCountry.cityoptions);
  };

  const handleCityChange = (newValue) => {
    // console.log(newValue);
  };

  return (
    <>
      <FormGroup
        {...args}
        className="wfp--form-long"
        align="horizontal"
        legendText="Address Info"
        style={{ marginTop: '1rem' }}>
        <div className="wfp--form-item" style={{ minWidth: '100px' }}>
          <label htmlFor="country" className="wfp--label">
            Country*
          </label>
          <CreatableSelect
            className="wfp--react-select-container"
            classNamePrefix="wfp--react-select"
            onChange={handleChange}
            options={options}
          />
        </div>
        <div className="wfp--form-item" style={{ minWidth: '100px' }}>
          <label htmlFor="city" className="wfp--label">
            City*
          </label>
          <CreatableSelect
            className="wfp--react-select-container"
            classNamePrefix="wfp--react-select"
            isClearable
            onChange={handleCityChange}
            options={cityoption}
          />
        </div>
        <TextInput
          id="zipcode"
          labelText="Postal code/ZIP code"
          placeholder="eg: 13-3456"
        />
      </FormGroup>
      <FormGroup {...args} className="wfp--form-long" align="horizontal">
        <TextInput
          id="street"
          labelText="Street"
          placeholder="eg: Chemin Aime Steinlein"
        />
        <NumberInput id="hno" labelText="House number" placeholder="5" />
      </FormGroup>
    </>
  );
};

AddressDetails.story = {
  name: 'Residence Address',
};

const addressdetailsourcecode = `
import {FormGroup, NumberInput, TextInput } from '@un/react';
import CreatableSelect from 'react-select/creatable';

const options = [
    {
      value: 'afghanistan',
      label: 'Afghanistan (AF)',
    },
    {
      value: 'albania',
      label: 'Albania',
    },
    {
      value: 'algeria',
      label: 'Algeria',
    },
  ];
  
  const cities = [
    {
      country: 'afghanistan',
      cityoptions: [
        { value: 'kabul', label: 'Kabul' },
        { value: 'kandahar', label: 'Kandahar' },
        { value: 'kerat', label: 'Herat' },
      ],
    },
    {
      country: 'albania',
      cityoptions: [
        { value: 'ballsh', label: 'ballsh' },
        { value: 'Fier', label: 'Fier' },
        { value: 'Labinot-Mal', label: 'Labinot-Mal' },
      ],
    },
    {
      country: 'algeria',
      cityoptions: [
        { value: 'algiers', label: 'Algiers' },
        { value: 'oran', label: 'Oran' },
        { value: 'constantine', label: 'Constantine' },
      ],
    },
  ];

const AddressDetails = () => {
    const [cityoption, setcityoption] = useState(null);

  const handleChange = (newValue) => {
    const selectedCountry = cities.find(
      (city) => city.country === newValue.value
    );
    setcityoption(selectedCountry.cityoptions);
  };

  const handleCityChange = (newValue) => {
  };
return(
    <>
        <FormGroup
        className="wfp--form-long"
        align="horizontal"
        legendText="Address Info"
        style={{ marginTop: '1rem' }}>
        <div className="wfp--form-item" style={{ minWidth: '100px' }}>
          <label htmlFor="country" className="wfp--label">
            Country*
          </label>
          <CreatableSelect
            className="wfp--react-select-container"
            classNamePrefix="wfp--react-select"
            onChange={handleChange}
            options={options}
          />
        </div>
        <div className="wfp--form-item" style={{ minWidth: '100px' }}>
          <label htmlFor="city" className="wfp--label">
            City*
          </label>
          <CreatableSelect
            className="wfp--react-select-container"
            classNamePrefix="wfp--react-select"
            isClearable
            onChange={handleCityChange}
            options={cityoption}
          />
        </div>
        <TextInput
          id="zipcode"
          labelText="Postal code/ZIP code"
          placeholder="eg: 13-3456"
        />
      </FormGroup>
      <FormGroup className="wfp--form-long" align="horizontal">
        <TextInput
          id="street"
          labelText="Street"
          placeholder="eg: Chemin Aime Steinlein"
        />
        <NumberInput id="hno" labelText="House number" placeholder="5" />
      </FormGroup>
      </>
)

}

export default AddressDetails;
`;

AddressDetails.story = {
  name: 'Residence Address',
  parameters: {
    docs: {
      source: {
        code: addressdetailsourcecode,
      },
    },
  },
};
