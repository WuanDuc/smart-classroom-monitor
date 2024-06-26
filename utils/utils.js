import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (newData) => {
  try {
    const existingData = await getData();
    const updatedData = existingData ? [...existingData, newData] : [newData];
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('historydata', jsonValue);
    console.log('Data stored successfully');
  } catch (e) {
    console.error('Failed to store data', e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('historydata');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch data', e);
    return [];
  }
};
export const deleteData = async (id) => {
  try {
    const existingData = await getData();
    const updatedData = existingData.filter(item => item.id !== id);
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('historydata', jsonValue);
    console.log('Data deleted successfully');
  } catch (e) {
    console.error('Failed to delete data', e);
  }
};

export const quickSort = arr => {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

export const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace('#', '');
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor && 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};
