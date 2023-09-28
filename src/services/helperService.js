import moment from "moment";

export const getErrorMessageAndCode = (error) => {
  const { code, message } = error.response.data;
  return { code, message };
};

export const trimValues = (obj) => {
  Date.prototype.toISOString = function () {
    if (moment(this).isSame(moment(), "day")) {
      return moment().format("YYYY-MM-DDTHH:mm:ss");
    } else {
      return moment(this).format("YYYY-MM-DDTHH:mm:ss");
    }
  };
  const trimmed = JSON.stringify(obj, (key, value) => {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  });
  return JSON.parse(trimmed);
};

export const differentValues = (obj1, obj2) => {
  return Object.keys(obj2).reduce((diff, key) => {
    if (obj1[key] === obj2[key]) return diff;
    return {
      ...diff,
      [key]: obj2[key],
    };
  }, {});
};

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach((k) => obj[k] === "" && delete obj[k]);
  return obj;
};

export const getSelectValue = (selectData, itemValue, mappingId) => {
  return (
    selectData?.find((item) => {
      return (
        String(item?.[mappingId]) === String(itemValue?.[mappingId]) && item
      );
    }) || {}
  );
};

export const scrollView = (element) => {
  const input = document.querySelector(`input[name=${element}]`);
  if (input) {
    setTimeout(() => {
      input.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }, 500);
  }
};
export const numberWithCommas = (x) => {
  return (x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) || 0;
};

export function formDataToJson(formData) {
  const json = {};
  formData.forEach((value, key) => {
    if (json.hasOwnProperty(key)) {
      if (!Array.isArray(json[key])) {
        json[key] = [json[key]];
      }
      json[key].push(value);
    } else {
      json[key] = value;
    }
  });
  return json;
}
