const toPersianDigits = (number) => {
    return number.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };
  export {toPersianDigits}