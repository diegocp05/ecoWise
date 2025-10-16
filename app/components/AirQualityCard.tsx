import React from 'react'

interface AqiProps {
    data:
    {
        aqi:number;
        mainPollutant: string;
    }
}

export const AirQualityCard = ({data}: AqiProps) => {
    const {aqi, mainPollutant} = data;
  return (
    <div className='text-2xl font-medium text-gray-400 pb-1'>{aqi} {mainPollutant}</div>
  )
}
