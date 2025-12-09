
export type Language = "en" | "th";

export const translations = {
  en: {
    title: "ATMOS",
    searchPlaceholder: "SEARCH LOCATION...",
    searchButton: "GO",
    about: "ABOUT",
    currentLocation: "Current Location",
    airQualityScore: "Air Quality Score",
    howToRead: "How to read this?",
    mainConcern: "Main Concern",
    healthTips: "Health Tips",
    forEveryone: "For Everyone",
    sensitiveGroups: "Sensitive Groups",
    outdoorActivity: "Outdoor Activity",
    whatsInTheAir: "What's in the Air?",
    fineParticles: "Fine Particles (PM2.5)",
    fineParticlesDesc: "Tiny particles from smoke/traffic. Gets deep in lungs.",
    ozone: "Ozone (O3)",
    ozoneDesc: "Main part of smog. Sunburn for lungs.",
    coarseParticles: "Coarse Particles (PM10)",
    coarseParticlesDesc: "Dust and pollen. Irritates throat/eyes.",
    nitrogenDioxide: "Nitrogen Dioxide (NO2)",
    nitrogenDioxideDesc: "Traffic fumes. Increases asthma risk.",
    lungImpact: "Lung Impact",
    lungImpactDesc: "24hrs of breathing this air is roughly equal to:",
    cigarettes: "CIGARETTES",
    lungImpactDisclaimer: "*Illustrative PM2.5 comparison only.",
    forecastTitle: "5-Day Forecast",
    forecastSubtitle: "Max Daily AQI",
    today: "Today",
    loading: "Loading Data...",
    errorTitle: "System Error",
    errorDesc: "Unable to retrieve atmospheric data stream.",
    retry: "Retry Connection",
    footer: "ATMOS Inc. Data provided by Open-Meteo.",
    liveData: "LIVE DATA",
    aboutTitle: "ABOUT ATMOS",
    aboutMissionTitle: "The Mission",
    aboutMissionDesc: "ATMOS strips away the clutter to show you exactly what you're breathing. No fluff, just raw, high-contrast data designed for immediate readability.",
    aboutDataTitle: "The Data",
    aboutDataDesc: "Real-time atmospheric data sourced directly from Open-Meteo APIs. We track PM2.5, Ozone, and other critical pollutants with precision.",
    aboutScaleTitle: "The Scale",
    aboutScaleDesc: "Understanding the Air Quality Index (AQI) ranges and their health implications.",
    backToDashboard: "Back to Dashboard",
    aqiLevels: {
      good: "Good",
      moderate: "Moderate",
      sensitive: "Sensitive",
      unhealthy: "Unhealthy",
      veryUnhealthy: "Very Unhealthy",
      hazardous: "Hazardous"
    },
    aqiDesc: {
      good: "Air quality is satisfactory, and air pollution poses little or no risk.",
      moderate: "Air quality is acceptable. However, there may be a risk for some people.",
      sensitive: "Members of sensitive groups may experience health effects.",
      unhealthy: "Some members of the general public may experience health effects.",
      veryUnhealthy: "Health alert: The risk of health effects is increased for everyone.",
      hazardous: "Health warning of emergency conditions: everyone is more likely to be affected."
    },
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    healthTipsContent: {
      good: {
        everyone: "It's a great day to be active outside.",
        sensitive: "No special precautions needed.",
        outdoor: "Perfect conditions for outdoor exercise."
      },
      moderate: {
        everyone: "Air quality is acceptable for most people.",
        sensitive: "If you are unusually sensitive to particle pollution, consider reducing activity.",
        outdoor: "Enjoy the outdoors, but listen to your body."
      },
      sensitive: {
        everyone: "Most people are unlikely to be affected.",
        sensitive: "Older adults and children should reduce prolonged or heavy exertion.",
        outdoor: "It's okay to be active, but take more breaks and do less intense activities."
      },
      unhealthy: {
        everyone: "Everyone may begin to experience health effects.",
        sensitive: "Avoid prolonged or heavy exertion. Move activities indoors or reschedule.",
        outdoor: "Avoid prolonged or heavy exertion. Consider moving activities indoors."
      },
      veryUnhealthy: {
        everyone: "Health warnings of emergency conditions. Everyone is more likely to be affected.",
        sensitive: "Avoid all physical activity outdoors.",
        outdoor: "Avoid all physical activity outdoors."
      },
      hazardous: {
        everyone: "Health alert: everyone may experience more serious health effects.",
        sensitive: "Remain indoors and keep activity levels low.",
        outdoor: "Avoid all physical activity outdoors."
      }
    }
  },
  th: {
    title: "ATMOS",
    searchPlaceholder: "ค้นหาตำแหน่ง...",
    searchButton: "ไป",
    about: "เกี่ยวกับ",
    currentLocation: "ตำแหน่งปัจจุบัน",
    airQualityScore: "คะแนนคุณภาพอากาศ",
    howToRead: "อ่านค่าอย่างไร?",
    mainConcern: "ข้อกังวลหลัก",
    healthTips: "คำแนะนำสุขภาพ",
    forEveryone: "สำหรับทุกคน",
    sensitiveGroups: "กลุ่มเปราะบาง",
    outdoorActivity: "กิจกรรมกลางแจ้ง",
    whatsInTheAir: "มีอะไรในอากาศ?",
    fineParticles: "ฝุ่นละอองขนาดเล็ก (PM2.5)",
    fineParticlesDesc: "อนุภาคจิ๋วจากควัน/จราจร เข้าสู่ปอดลึก",
    ozone: "โอโซน (O3)",
    ozoneDesc: "ส่วนหลักของหมอกควัน เหมือนผิวไหม้แดดในปอด",
    coarseParticles: "ฝุ่นละอองขนาดใหญ่ (PM10)",
    coarseParticlesDesc: "ฝุ่นและละอองเกสร ระคายเคืองคอและตา",
    nitrogenDioxide: "ไนโตรเจนไดออกไซด์ (NO2)",
    nitrogenDioxideDesc: "ก๊าซจากรถยนต์ เพิ่มความเสี่ยงหอบหืด",
    lungImpact: "ผลกระทบต่อปอด",
    lungImpactDesc: "หายใจอากาศนี้ 24 ชม. เทียบเท่ากับ:",
    cigarettes: "มวนบุหรี่",
    lungImpactDisclaimer: "*การเปรียบเทียบ PM2.5 เพื่อประกอบภาพเท่านั้น",
    forecastTitle: "พยากรณ์ 5 วัน",
    forecastSubtitle: "ดัชนีสูงสุดรายวัน",
    today: "วันนี้",
    loading: "กำลังโหลดข้อมูล...",
    errorTitle: "ระบบผิดพลาด",
    errorDesc: "ไม่สามารถดึงข้อมูลสภาพอากาศได้",
    retry: "ลองใหม่",
    footer: "ATMOS Inc. ข้อมูลโดย Open-Meteo",
    liveData: "ข้อมูลสด",
    aboutTitle: "เกี่ยวกับ ATMOS",
    aboutMissionTitle: "ภารกิจ",
    aboutMissionDesc: "ATMOS ตัดสิ่งที่ไม่จำเป็นออกเพื่อแสดงให้คุณเห็นว่าคุณกำลังหายใจอะไรเข้าไป ข้อมูลดิบ คมชัด อ่านง่ายทันที",
    aboutDataTitle: "ข้อมูล",
    aboutDataDesc: "ข้อมูลสภาพอากาศแบบเรียลไทม์จาก Open-Meteo เราติดตาม PM2.5 โอโซน และมลพิษอื่นๆ อย่างแม่นยำ",
    aboutScaleTitle: "เกณฑ์วัด",
    aboutScaleDesc: "ความหมายของดัชนีคุณภาพอากาศ (AQI) และผลกระทบต่อสุขภาพ",
    backToDashboard: "กลับสู่หน้าหลัก",
    aqiLevels: {
      good: "ดี",
      moderate: "ปานกลาง",
      sensitive: "เริ่มมีผลกระทบ",
      unhealthy: "มีผลกระทบ",
      veryUnhealthy: "มีผลกระทบมาก",
      hazardous: "อันตราย"
    },
    aqiDesc: {
      good: "คุณภาพอากาศน่าพอใจ และมลพิษทางอากาศมีความเสี่ยงน้อยหรือไม่มีเลย",
      moderate: "คุณภาพอากาศยอมรับได้ แต่อาจมีความเสี่ยงสำหรับบางคน",
      sensitive: "สมาชิกในกลุ่มเปราะบางอาจมีผลกระทบต่อสุขภาพ",
      unhealthy: "บุคคลทั่วไปอาจเริ่มมีผลกระทบต่อสุขภาพ",
      veryUnhealthy: "แจ้งเตือนสุขภาพ: ความเสี่ยงต่อสุขภาพเพิ่มขึ้นสำหรับทุกคน",
      hazardous: "คำเตือนภาวะฉุกเฉิน: ทุกคนมีแนวโน้มที่จะได้รับผลกระทบ"
    },
    days: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    healthTipsContent: {
      good: {
        everyone: "เป็นวันที่ดีสำหรับการทำกิจกรรมกลางแจ้ง",
        sensitive: "ไม่ต้องระวังเป็นพิเศษ",
        outdoor: "สภาพอากาศสมบูรณ์แบบสำหรับการออกกำลังกาย"
      },
      moderate: {
        everyone: "คุณภาพอากาศยอมรับได้สำหรับคนส่วนใหญ่",
        sensitive: "หากคุณไวต่อมลพิษเป็นพิเศษ ควรลดกิจกรรมหนัก",
        outdoor: "ทำกิจกรรมได้ตามปกติ แต่สังเกตร่างกายตัวเอง"
      },
      sensitive: {
        everyone: "คนส่วนใหญ่น่าจะไม่ได้รับผลกระทบ",
        sensitive: "ผู้สูงอายุและเด็กควรลดการออกแรงหนักหรือนาน",
        outdoor: "ออกกำลังกายได้ แต่ควรพักบ่อยขึ้นและลดความหนักลง"
      },
      unhealthy: {
        everyone: "ทุกคนอาจเริ่มรู้สึกระคายเคืองหรือมีผลต่อสุขภาพ",
        sensitive: "หลีกเลี่ยงการออกแรงหนัก ย้ายกิจกรรมเข้าในร่ม",
        outdoor: "หลีกเลี่ยงการออกแรงหนัก ควรออกกำลังกายในร่ม"
      },
      veryUnhealthy: {
        everyone: "คำเตือนสุขภาพฉุกเฉิน ทุกคนมีความเสี่ยงสูง",
        sensitive: "งดกิจกรรมกลางแจ้งทุกชนิด",
        outdoor: "งดกิจกรรมกลางแจ้งทุกชนิด"
      },
      hazardous: {
        everyone: "แจ้งเตือนภัยสุขภาพ: ทุกคนอาจได้รับผลกระทบรุนแรง",
        sensitive: "อยู่ในอาคารและงดกิจกรรมทุกชนิด",
        outdoor: "ห้ามทำกิจกรรมกลางแจ้งโดยเด็ดขาด"
      }
    }
  }
};
