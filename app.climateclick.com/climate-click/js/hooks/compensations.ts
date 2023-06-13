import { request, getAccessTokenFromLocalStorage } from './useOrganization'

export type DataPoint = {
  amount:number;
  day:string;
}

export const getLatestDailyCompensations = async (numberOfDays:number=30):Promise<DataPoint[]> => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - numberOfDays);

  const toString = getDateString(to);
  const fromString = getDateString(from);

  const accessToken = getAccessTokenFromLocalStorage();
  if (!accessToken) {
    return [];
  }
  const requestUrl = `/dashboard/compensationsPerDay?from=${fromString}&to=${toString}`;
  const response = await request(accessToken, requestUrl);
  const responseData = await response.json();

  const dailyCompensations:DataPoint[] = generateLastNDaysArray(numberOfDays);
  const dataMap = new Map<string, number>(responseData.compensations.map((d:any) => [d.day.slice(0,10), d.amountInEurCents]))
  dailyCompensations.map((d:DataPoint) => {
      d.amount = (dataMap.get(d.day) || 0) / 100;
      d.day = formatDate(d.day);
  });
  return dailyCompensations;
}

const generateLastNDaysArray = (n:number):DataPoint[] => {
  const data:DataPoint[] = [];
  for (let i = n; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      amount: 0,
      day: getDateString(date),
    });
  }
  return data;
}

const formatDate = (dateString:string):string => {
  const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');

  return `${month} ${day}`;
}

const getDateString = (date:Date):string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}