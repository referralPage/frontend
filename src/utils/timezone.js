function getTimeZone(regionCode) {
    if (regionCode === "korea") {
      regionCode = "KR";
    }
    if (regionCode === "japan") {
      regionCode = "JP";
    }
    if (regionCode === "chinese") {
      regionCode = "CN";
    }
    if (regionCode === "english") {
      regionCode = "US";
    }
    if (regionCode === "vietnam") {
      regionCode = "VN";
    }
  
    const timeZoneMap = {
      CN: "Asia/Shanghai", // China
      IN: "Asia/Kolkata", // India
      US: "America/New_York", // United States
      ID: "Asia/Jakarta", // Indonesia
      PK: "Asia/Karachi", // Pakistan
      BR: "America/Sao_Paulo", // Brazil
      NG: "Africa/Lagos", // Nigeria
      BD: "Asia/Dhaka", // Bangladesh
      RU: "Europe/Moscow", // Russia
      MX: "America/Mexico_City", // Mexico
      JP: "Asia/Tokyo", // Japan
      PH: "Asia/Manila", // Philippines
      EG: "Africa/Cairo", // Egypt
      ET: "Africa/Addis_Ababa", // Ethiopia
      VN: "Asia/Ho_Chi_Minh", // Vietnam
      DE: "Europe/Berlin", // Germany
      IR: "Asia/Tehran", // Iran
      TR: "Europe/Istanbul", // Turkey
      CD: "Africa/Kinshasa", // DR Congo
      FR: "Europe/Paris", // France
      GB: "Europe/London", // United Kingdom
      TH: "Asia/Bangkok", // Thailand
      IT: "Europe/Rome", // Italy
      ZA: "Africa/Johannesburg", // South Africa
      MM: "Asia/Yangon", // Myanmar
      KR: "Asia/Seoul", // South Korea
      CO: "America/Bogota", // Colombia
      ES: "Europe/Madrid", // Spain
      UA: "Europe/Kiev", // Ukraine
      TZ: "Africa/Dar_es_Salaam", // Tanzania
      AR: "America/Buenos_Aires", // Argentina
      KE: "Africa/Nairobi", // Kenya
      PL: "Europe/Warsaw", // Poland
      CA: "America/Toronto", // Canada
      UG: "Africa/Kampala", // Uganda
      IQ: "Asia/Baghdad", // Iraq
      SD: "Africa/Khartoum", // Sudan
      MA: "Africa/Casablanca", // Morocco
      PE: "America/Lima", // Peru
      SA: "Asia/Riyadh", // Saudi Arabia
      MY: "Asia/Kuala_Lumpur", // Malaysia
      VE: "America/Caracas", // Venezuela
      NP: "Asia/Kathmandu", // Nepal
      AF: "Asia/Kabul", // Afghanistan
      GH: "Africa/Accra", // Ghana
      YE: "Asia/Aden", // Yemen
      KP: "Asia/Pyongyang", // North Korea
      AU: "Australia/Sydney", // Australia
      RO: "Europe/Bucharest", // Romania
      NL: "Europe/Amsterdam", // Netherlands
      BE: "Europe/Brussels", // Belgium
      SE: "Europe/Stockholm", // Sweden
      CH: "Europe/Zurich", // Switzerland
      NO: "Europe/Oslo", // Norway
      DK: "Europe/Copenhagen", // Denmark
      FI: "Europe/Helsinki", // Finland
      AT: "Europe/Vienna", // Austria
      PT: "Europe/Lisbon", // Portugal
      IE: "Europe/Dublin", // Ireland
      CZ: "Europe/Prague", // Czech Republic
      GR: "Europe/Athens", // Greece
      HU: "Europe/Budapest", // Hungary
      IL: "Asia/Jerusalem", // Israel
      AE: "Asia/Dubai", // United Arab Emirates
      DZ: "Africa/Algiers", // Algeria
      TN: "Africa/Tunis", // Tunisia
      CI: "Africa/Abidjan", // Ivory Coast
      SN: "Africa/Dakar", // Senegal
      CM: "Africa/Douala", // Cameroon
      MZ: "Africa/Maputo", // Mozambique
      AO: "Africa/Luanda", // Angola
      BW: "Africa/Gaborone", // Botswana
      ZW: "Africa/Harare", // Zimbabwe
      MU: "Indian/Mauritius", // Mauritius
      RE: "Indian/Reunion", // Reunion
      SC: "Indian/Mahe", // Seychelles
      CL: "America/Santiago", // Chile
      EC: "America/Guayaquil", // Ecuador
      BO: "America/La_Paz", // Bolivia
      PY: "America/Asuncion", // Paraguay
      UY: "America/Montevideo", // Uruguay
      SR: "America/Paramaribo", // Suriname
      GY: "America/Guyana", // Guyana
      BB: "America/Barbados", // Barbados
      SG: "Asia/Singapore", // Singapore
      HK: "Asia/Hong_Kong", // Hong Kong
      NZ: "Pacific/Auckland", // New Zealand
      LK: "Asia/Colombo", // Sri Lanka
      KH: "Asia/Phnom_Penh", // Cambodia
      LA: "Asia/Vientiane", // Laos
      BN: "Asia/Brunei", // Brunei
      MV: "Indian/Maldives", // Maldives
      FJ: "Pacific/Fiji", // Fiji
      WS: "Pacific/Apia", // Samoa
      SB: "Pacific/Guadalcanal", // Solomon Islands
      TO: "Pacific/Tongatapu", // Tonga
      VU: "Pacific/Efate", // Vanuatu
      FM: "Pacific/Pohnpei", // Micronesia
      PW: "Pacific/Palau", // Palau
      MH: "Pacific/Majuro", // Marshall Islands
      KI: "Pacific/Tarawa", // Kiribati
      TV: "Pacific/Funafuti", // Tuvalu
      NR: "Pacific/Nauru", // Nauru
      WF: "Pacific/Wallis", // Wallis and Futuna
      QA: "Asia/Qatar", // Qatar
      BH: "Asia/Bahrain", // Bahrain
      KW: "Asia/Kuwait", // Kuwait
      OM: "Asia/Muscat", // Oman
      JO: "Asia/Amman", // Jordan
      LB: "Asia/Beirut", // Lebanon
      SY: "Asia/Damascus", // Syria
      GE: "Asia/Tbilisi", // Georgia
      AM: "Asia/Yerevan", // Armenia
      AZ: "Asia/Baku", // Azerbaijan
      TM: "Asia/Ashgabat", // Turkmenistan
      TJ: "Asia/Dushanbe", // Tajikistan
      KG: "Asia/Bishkek", // Kyrgyzstan
      UZ: "Asia/Tashkent", // Uzbekistan
      KZ: "Asia/Almaty", // Kazakhstan
      MN: "Asia/Ulaanbaatar", // Mongolia
      BT: "Asia/Thimphu", // Bhutan
      PA: "America/Panama", // Panama
      CR: "America/Costa_Rica", // Costa Rica
      NI: "America/Managua", // Nicaragua
      HN: "America/Tegucigalpa", // Honduras
      SV: "America/El_Salvador", // El Salvador
      GT: "America/Guatemala", // Guatemala
      BZ: "America/Belize", // Belize
      CU: "America/Havana", // Cuba
      JM: "America/Jamaica", // Jamaica
      HT: "America/Port-au-Prince", // Haiti
      DO: "America/Santo_Domingo", // Dominican Republic
      TT: "America/Port_of_Spain", // Trinidad and Tobago
      LC: "America/St_Lucia", // Saint Lucia
      GD: "America/Grenada", // Grenada
      VC: "America/St_Vincent", // Saint Vincent and the Grenadines
      AG: "America/Antigua", // Antigua and Barbuda
      KN: "America/St_Kitts", // Saint Kitts and Nevis
      DM: "America/Dominica", // Dominica
      KY: "America/Cayman", // Cayman Islands
      BM: "Atlantic/Bermuda", // Bermuda
      GL: "America/Godthab", // Greenland
      TC: "America/Grand_Turk", // Turks and Caicos Islands
      MS: "America/Montserrat", // Montserrat
      MP: "Pacific/Saipan", // Northern Mariana Islands
      GU: "Pacific/Guam", // Guam
      VI: "America/St_Thomas", // U.S. Virgin Islands
      PR: "America/Puerto_Rico", // Puerto Rico
      AS: "Pacific/Pago_Pago", // American Samoa
      UM: "Pacific/Wake", // United States Minor Outlying Islands
      PF: "Pacific/Tahiti", // French Polynesia
      CK: "Pacific/Rarotonga", // Cook Islands
      NU: "Pacific/Niue", // Niue
      TK: "Pacific/Fakaofo", // Tokelau
      GG: "Europe/Guernsey", // Guernsey
      JE: "Europe/Jersey", // Jersey
      IM: "Europe/Isle_of_Man", // Isle of Man
      FO: "Atlantic/Faroe", // Faroe Islands
      GI: "Europe/Gibraltar", // Gibraltar
      AX: "Europe/Mariehamn", // Åland Islands
      SM: "Europe/San_Marino", // San Marino
      MC: "Europe/Monaco", // Monaco
      VA: "Europe/Vatican", // Vatican City
      AD: "Europe/Andorra", // Andorra
      LI: "Europe/Vaduz", // Liechtenstein
      SJ: "Arctic/Longyearbyen", // Svalbard and Jan Mayen
      FK: "Atlantic/Stanley", // Falkland Islands
      GF: "America/Cayenne", // French Guiana
      MQ: "America/Martinique", // Martinique
      GP: "America/Guadeloupe", // Guadeloupe
      MF: "America/Marigot", // Saint Martin (French part)
    };
    // console.log(timeZoneMap[regionCode]);
    return timeZoneMap[regionCode] || "UTC"; // Default to UTC if no mapping is found
  }
  
  function setTimeZone(utcDate,regionCode) {
    const timeZone = getTimeZone(regionCode);
    const dateInUTC = new Date(utcDate + "Z");

    // const locale = navigator.language;
    const options = {
      timeZone: timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(dateInUTC);
 
    let [month, day, year] = formattedDate.split(",")[0].split("/");
      year = year.slice(2,4);
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
  
    let [time, min] = formattedDate.split(" ")[1].split(":");
    if (time.length === 1) {
      time = `0${time}`;
    }
    if (min.length === 1) {
      min = `0${min}`;
    }
  
    let changeDate = `${year}.${month}.${day} ${time}:${min} `;
    return changeDate;
  }
  
  export { getTimeZone, setTimeZone };
  