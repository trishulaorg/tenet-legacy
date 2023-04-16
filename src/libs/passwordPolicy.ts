/**
 * Regular expressions of at least 8 and no more than 100 characters, including at least one each of lower-case and uppercase single-byte alphabetic and numeric characters
 * Copy from https://qiita.com/mpyw/items/886218e7b418dfed254b#%E5%8D%8A%E8%A7%92%E8%8B%B1%E5%B0%8F%E6%96%87%E5%AD%97%E5%A4%A7%E6%96%87%E5%AD%97%E6%95%B0%E5%AD%97%E3%82%92%E3%81%9D%E3%82%8C%E3%81%9E%E3%82%8C1%E7%A8%AE%E9%A1%9E%E4%BB%A5%E4%B8%8A%E5%90%AB%E3%82%808%E6%96%87%E5%AD%97%E4%BB%A5%E4%B8%8A100%E6%96%87%E5%AD%97%E4%BB%A5%E4%B8%8B%E3%81%AE%E6%AD%A3%E8%A6%8F%E8%A1%A8%E7%8F%BE
 */
export const passwordPolicy = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/
