import {css} from 'emotion';
import * as React from "react";
import * as CountUp from 'react-countup';

export interface TickerProps {
  title: string;
  label: string;
  overallNumber: number;
  numberOfDays: number;
}

const labelCss = css`
  font-size: 50%
`;

export const Ticker = (props: TickerProps) => {
  const dailyRate = props.overallNumber / props.numberOfDays;
  const currentHour = new Date().getHours();
  const hourlyRate = dailyRate / 24;
  return (
    <div>
      {props.title}
      <div className={labelCss}>
        {props.label} yesterday
      </div>
      <CountUp
        separator=","
        start={dailyRate}
        end={dailyRate}
        duration={0}
      />
      <div className={labelCss}>
        <b>{props.label} so far today</b>
      </div>
      <CountUp
        separator=","
        start={hourlyRate * currentHour}
        end={dailyRate}
        duration={(24 - currentHour) * 3600}
      />
    </div>
  );
};