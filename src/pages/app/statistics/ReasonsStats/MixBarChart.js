import React from 'react';
import {BarChart, Bar, XAxis, ResponsiveContainer, Tooltip} from 'recharts';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import './index.style.less';

const MixBarChart = ({data}) => {
  const {messages} = useIntl();

  return (
    <ResponsiveContainer width='100%' height={270}>
      <BarChart
        barSize={20}
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}>
        <XAxis dataKey='name' dy={10} />
        <Tooltip />
        <Bar
          isAnimationActive={true}
          animationEasing='ease-in-out'
          dataKey={messages['common.total']}
          stackId='a'
          fill='#b71b4b'
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MixBarChart;

MixBarChart.defaultProps = {
  data: [],
};

MixBarChart.propTypes = {
  data: PropTypes.array,
};
