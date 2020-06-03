import React from 'react';
import PropTypes from 'prop-types';
import rawData from './data.js';
const dataIndexes = rawData.indexes.split(',');

function decode(name) {
  if (typeof name !== 'string') {
    return name;
  }
  return name
    .replace(/S/g, '省')
    .replace(/s/g, '市')
    .replace(/z/g, '州')
    .replace(/q/g, '区')
    .replace(/x/g, '县');
}

function parseName(name) {
  if (name === '-1') {
    return null;
  }
  return name;
}

function tryIndexes(name) {
  return dataIndexes[name] || name;
}

function processName(name) {
  return decode(tryIndexes(parseName(name)));
}

const data = rawData.data.split('\n').map(line => {
  const [name, parent] = line.split(',');
  return {
    name: processName(name),
    parent: processName(parent)
  };
});

const provinceData = data.filter(item => {
  return !item.parent;
});

function Options(props) {
  return props.list.map((item, index) => (
    <option key={item.name} value={item.name}>
      {item.name}
    </option>
  ));
}

const AreaPicker = props => {
  const [provinceVal, cityVal, regionVal] = props.value;
  const cityData = data.filter(item => item.parent === provinceVal);
  const regionData = data.filter(item => item.parent === cityVal);
  const { render, level } = props;
  if (render) {
    return render({
      provinceData,
      cityData,
      regionData
    });
  }
  return (
    <>
      <select
        value={provinceVal}
        onChange={e => {
          const { value } = e.target;
          props.onChange &&
            props.onChange({
              value: [value]
            });
        }}
      >
        <option value="">（省）</option>
        <Options list={provinceData} />
      </select>
      {level >= 2 ? (
        <select
          value={cityVal}
          onChange={e => {
            const { value } = e.target;
            props.onChange &&
              props.onChange({
                value: [provinceVal, value]
              });
          }}
        >
          <option value="">（市）</option>
          <Options list={cityData} />
        </select>
      ) : null}
      {level >= 3 ? (
        <select
          value={regionVal}
          onChange={e => {
            const { value } = e.target;
            props.onChange &&
              props.onChange({
                value: [provinceVal, cityVal, value]
              });
          }}
        >
          <option value="">（区）</option>
          <Options list={regionData} />
        </select>
      ) : null}
    </>
  );
};

AreaPicker.propTypes = {
  value: PropTypes.array,
  level: PropTypes.oneOf([1, 2, 3])
};

AreaPicker.defaultProps = {
  value: [],
  level: 3
};

export default AreaPicker;
