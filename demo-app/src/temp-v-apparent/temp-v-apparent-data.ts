// Data from https://open-meteo.com/
export const tempVApparentData = [
  {
    'time': '12 AM',
    'temperature': 62,
    'apparentTemperature': 63
  },
  {
    'time': '1 AM',
    'temperature': 60,
    'apparentTemperature': 61
  },
  {
    'time': '2 AM',
    'temperature': 58,
    'apparentTemperature': 58
  },
  {
    'time': '3 AM',
    'temperature': 59,
    'apparentTemperature': 59
  },
  {
    'time': '4 AM',
    'temperature': 58,
    'apparentTemperature': 57
  },
  {
    'time': '5 AM',
    'temperature': 57,
    'apparentTemperature': 55
  },
  {
    'time': '6 AM',
    'temperature': 56,
    'apparentTemperature': 54
  },
  {
    'time': '7 AM',
    'temperature': 56,
    'apparentTemperature': 55
  },
  {
    'time': '8 AM',
    'temperature': 59,
    'apparentTemperature': 57
  },
  {
    'time': '9 AM',
    'temperature': 63,
    'apparentTemperature': 62
  },
  {
    'time': '10 AM',
    'temperature': 67,
    'apparentTemperature': 65
  },
  {
    'time': '11 AM',
    'temperature': 70,
    'apparentTemperature': 68
  },
  {
    'time': '12 PM',
    'temperature': 73,
    'apparentTemperature': 69
  },
  {
    'time': '1 PM',
    'temperature': 73,
    'apparentTemperature': 69
  },
  {
    'time': '2 PM',
    'temperature': 73,
    'apparentTemperature': 67
  },
  {
    'time': '3 PM',
    'temperature': 74,
    'apparentTemperature': 67
  },
  {
    'time': '4 PM',
    'temperature': 71,
    'apparentTemperature': 65
  },
  {
    'time': '5 PM',
    'temperature': 66,
    'apparentTemperature': 60
  },
  {
    'time': '6 PM',
    'temperature': 63,
    'apparentTemperature': 58
  },
  {
    'time': '7 PM',
    'temperature': 66,
    'apparentTemperature': 61
  },
  {
    'time': '8 PM',
    'temperature': 64,
    'apparentTemperature': 58
  },
  {
    'time': '9 PM',
    'temperature': 61,
    'apparentTemperature': 57
  },
  {
    'time': '10 PM',
    'temperature': 58,
    'apparentTemperature': 56
  },
  {
    'time': '11 PM',
    'temperature': 56,
    'apparentTemperature': 54
  }
];

export const getYRange = (): [number, number] => {
  const yValues = [...tempVApparentData.map(({ temperature }) => temperature), ...tempVApparentData.map(({ apparentTemperature }) => apparentTemperature)];

  return [Math.min(...yValues), Math.max(...yValues)]
}