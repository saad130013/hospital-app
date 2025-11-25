
import { AppConfig } from './types';

export const INITIAL_DATA: AppConfig = {
  inspectors: [
    { id: '1', displayName: "أمل", username: "amal", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true },
    { id: '2', displayName: "ليلى", username: "laila", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true },
    { id: '3', displayName: "نزار المالكي", username: "nizar", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true },
    { id: '4', displayName: "عبدالله الحربي", username: "abdullah", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true },
    { id: '5', displayName: "ذياب", username: "thiab", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true },
    { id: '6', displayName: "علي القرني", username: "ali", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true },
    { id: '7', displayName: "صالح", username: "saleh", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true },
    { id: '8', displayName: "عبد العزيز (الفترة المسائية)", username: "aziz", passwordHash: "123", allowedZoneTypes: ["HIGH_RISK", "MED_RISK", "GENERAL"], isActive: true }
  ],
  zones: [
    { id: "z1", name: "جناح 5", type_code: "HIGH_RISK" },
    { id: "z2", name: "جناح 7-8", type_code: "HIGH_RISK" },
    { id: "z3", name: "جناح 1-2-3-4", type_code: "HIGH_RISK" },
    { id: "z4", name: "قسم الأسنان", type_code: "HIGH_RISK" },
    { id: "z5", name: "الخدمة الاجتماعية والشؤون الاكاديمبة", type_code: "GENERAL" },
    { id: "z6", name: "الغرف التعليمية والمكتبة", type_code: "GENERAL" },
    { id: "z7", name: "غرف الاطباء المناوبين نساء", type_code: "GENERAL" },
    { id: "z8", name: "مصليات النساء", type_code: "GENERAL" },
    { id: "z9", name: "قسم التغذية", type_code: "GENERAL" },
    { id: "z10", name: "pergola medical", type_code: "GENERAL" },
    { id: "z11", name: "مكاتب اهلية العلاج ،التنسيق الطبي", type_code: "GENERAL" },
    { id: "z12", name: "قسم الاعمال ،التنويم", type_code: "GENERAL" },
    { id: "z13", name: "CSSD", type_code: "HIGH_RISK" },
    { id: "z14", name: "قسم الولادة", type_code: "HIGH_RISK" },
    { id: "z15", name: "MFMU", type_code: "HIGH_RISK" },
    { id: "z16", name: "جناح 16", type_code: "HIGH_RISK" },
    { id: "z17", name: "جناح 9-10", type_code: "HIGH_RISK" },
    { id: "z18", name: "جناح 11-12", type_code: "HIGH_RISK" },
    { id: "z19", name: "الاشعة الرئسية والاقسام التابعة", type_code: "HIGH_RISK" },
    { id: "z20", name: "المناظير", type_code: "HIGH_RISK" },
    { id: "z21", name: "عمليات اليوم الواحد", type_code: "HIGH_RISK" },
    { id: "z22", name: "قسم التخدير", type_code: "HIGH_RISK" },
    { id: "z23", name: "Day Care", type_code: "GENERAL" },
    { id: "z24", name: "MC2", type_code: "GENERAL" },
    { id: "z25", name: "ادارة PHC", type_code: "GENERAL" },
    { id: "z26", name: "مكاتب مكافحة العدوى و الاتصالات", type_code: "GENERAL" },
    { id: "z27", name: "مكاتب الإدارة الطبية وقسم التمريض", type_code: "GENERAL" },
    { id: "z28", name: "جناح 6-13-14-15", type_code: "HIGH_RISK" },
    { id: "z29", name: "جناح 17-18-20", type_code: "HIGH_RISK" },
    { id: "z30", name: "العلاج الطبيعي", type_code: "MED_RISK" },
    { id: "z31", name: "المستودع الرئيسي داخل المستشفى", type_code: "MED_RISK" },
    { id: "z32", name: "مبنى العيادات الخارجية (ثلاثة طوابق)", type_code: "MED_RISK" },
    { id: "z33", name: "مركز التبرع بالدم", type_code: "MED_RISK" },
    { id: "z34", name: "قاعة الاندجاني", type_code: "GENERAL" },
    { id: "z35", name: "قاعة الرازي", type_code: "GENERAL" },
    { id: "z36", name: "العلاج الطبيعي القديم", type_code: "GENERAL" },
    { id: "z37", name: "مركز المعلومات", type_code: "GENERAL" },
    { id: "z38", name: "الطب الميداني الجديد", type_code: "GENERAL" },
    { id: "z39", name: "مكاتب ادارة المشاريع", type_code: "GENERAL" },
    { id: "z40", name: "مسجد ومواقف العلاج الطبيعي", type_code: "GENERAL" },
    { id: "z41", name: "المبنى الإداري الجديد", type_code: "GENERAL" },
    { id: "z42", name: "منطقة الطواريء NTCC", type_code: "HIGH_RISK" },
    { id: "z43", name: "وحدة العناية المركزة NTCC", type_code: "HIGH_RISK" },
    { id: "z44", name: "غرف العمليات الرئيسية NTCC", type_code: "HIGH_RISK" },
    { id: "z45", name: "وحدة علاج إصابات الحرائق NTCC", type_code: "HIGH_RISK" },
    { id: "z46", name: "جناح الافاقة NTCC", type_code: "HIGH_RISK" },
    { id: "z47", name: "جناح 28-30-31", type_code: "HIGH_RISK" },
    { id: "z48", name: "جناح 40-41 -50-51", type_code: "HIGH_RISK" },
    { id: "z49", name: "CSSD - NTCC", type_code: "HIGH_RISK" },
    { id: "z50", name: "جميع الصيدليات NTCC", type_code: "HIGH_RISK" },
    { id: "z51", name: "الاشعة بجميع انواعها - NTCC", type_code: "MED_RISK" },
    { id: "z52", name: "بنك الدم", type_code: "MED_RISK" },
    { id: "z53", name: "مبنى المولدات", type_code: "GENERAL" },
    { id: "z54", name: "مبنى الغلايات", type_code: "GENERAL" },
    { id: "z55", name: "محطة التبريد", type_code: "GENERAL" },
    { id: "z56", name: "جناح 22 -23", type_code: "HIGH_RISK" },
    { id: "z57", name: "جناح 24- 25", type_code: "HIGH_RISK" },
    { id: "z58", name: "مركز الأميرة نورة", type_code: "HIGH_RISK" },
    { id: "z59", name: "مركز القلب", type_code: "HIGH_RISK" },
    { id: "z60", name: "صيدلة التكرار بالقلب", type_code: "HIGH_RISK" },
    { id: "z61", name: "جراحة المسالك البولية", type_code: "HIGH_RISK" },
    { id: "z62", name: "المختبر", type_code: "HIGH_RISK" },
    { id: "z63", name: "جميع الصيدليات", type_code: "HIGH_RISK" },
    { id: "z64", name: "مغسلة الموتى", type_code: "MED_RISK" },
    { id: "z65", name: "الصيدله الداخليه الرئسية", type_code: "MED_RISK" },
    { id: "z66", name: "PENT HOUSE", type_code: "GENERAL" },
    { id: "z67", name: "غرف النفايات الطبية", type_code: "GENERAL" },
    { id: "z68", name: "غرف النفايات العامة", type_code: "GENERAL" },
    { id: "z69", name: "المسجد الداخلي", type_code: "GENERAL" },
    { id: "z70", name: "غرف الاطباء الناوبين رجال", type_code: "GENERAL" },
    { id: "z71", name: "PHC", type_code: "GENERAL" },
    { id: "z72", name: "عيادة إسكان الحرس الوطني", type_code: "GENERAL" },
    { id: "z73", name: "مركز العيادات التخصصية", type_code: "GENERAL" },
    { id: "z74", name: "مركز الطب الوقائي", type_code: "GENERAL" },
    { id: "z75", name: "مبنى السموم", type_code: "HIGH_RISK" },
    { id: "z76", name: "منطقة الطواريء", type_code: "HIGH_RISK" },
    { id: "z77", name: "وحدة العناية المركزة", type_code: "HIGH_RISK" },
    { id: "z78", name: "غرف العمليات الرئيسية", type_code: "HIGH_RISK" },
    { id: "z79", name: "وحدة علاج إصابات الحرائق", type_code: "HIGH_RISK" },
    { id: "z80", name: "جناح الافاقة", type_code: "HIGH_RISK" },
    { id: "z81", name: "المختبر المركزي الجديد", type_code: "HIGH_RISK" },
    { id: "z82", name: "قيادة الطب العسكري", type_code: "GENERAL" },
    { id: "z83", name: "منطقة ادارة الصيانة", type_code: "GENERAL" },
    { id: "z84", name: "ادارة المواصلات", type_code: "GENERAL" },
    { id: "z85", name: "سنترال", type_code: "GENERAL" },
    { id: "z86", name: "المسجد الرئيسي", type_code: "GENERAL" },
    { id: "z87", name: "البريد والمالية", type_code: "GENERAL" },
    { id: "z88", name: "مركز صحي ام السلم", type_code: "GENERAL" },
    { id: "z89", name: "مركز صحي بحره", type_code: "GENERAL" },
    { id: "z90", name: "عيادة مركز التدريب", type_code: "GENERAL" },
    { id: "z91", name: "CMC", type_code: "GENERAL" },
    { id: "z92", name: "جميع الحدائق", type_code: "GENERAL" },
    { id: "z93", name: "MC1-MC3-MC4", type_code: "GENERAL" },
    { id: "z94", name: "مبنى الضيافة", type_code: "GENERAL" },
    { id: "z95", name: "ادارة الرعاية الصحية", type_code: "GENERAL" },
    { id: "z96", name: "غرف الانتظار الخارجية", type_code: "GENERAL" },
    { id: "z97", name: "مواقف السيارات", type_code: "GENERAL" },
    { id: "z98", name: "مواقف السيارات الزوار", type_code: "GENERAL" },
    { id: "z99", name: "غرف الحراس والبوابات", type_code: "GENERAL" },
    { id: "z100", name: "NTCC", type_code: "HIGH_RISK" },
    { id: "z101", name: "مسجد ACC", type_code: "HIGH_RISK" },
    { id: "z102", name: "Guest House", type_code: "HIGH_RISK" },
    { id: "z103", name: "Pergola admin", type_code: "HIGH_RISK" }
  ],
  checklists: [
    // 🟢 GENERAL (Public Area)
    { id: "g1", number: 1, name: "نظافة السجاد", max_score: 6, area_type: "GENERAL", isActive: true, possible_observations: ["غبار", "بقع", "رائحة كريهة"] },
    { id: "g2", number: 2, name: "الأرضيات والبلاط والسلالم والأسقف", max_score: 10, area_type: "GENERAL", isActive: true, possible_observations: ["غبار", "بقع", "صدأ"] },
    { id: "g3", number: 3, name: "تلميع الأرضيات الرخام/الفينيل", max_score: 8, area_type: "GENERAL", isActive: true, possible_observations: ["يحتاج تنظيف", "يحتاج شمع", "يحتاج تلميع"] },
    { id: "g4", number: 4, name: "أثاث المكاتب والكراسي", max_score: 4, area_type: "GENERAL", isActive: true, possible_observations: ["غبار", "بقع", "غير نظيف"] },
    { id: "g5", number: 5, name: "استعمال المواد الكيميائية", max_score: 10, area_type: "GENERAL", isActive: true, possible_observations: ["تاريخ", "قائمة", "تخفيف", "بدون ملصق"] },
    { id: "g6", number: 6, name: "الحمامات ودورات المياه", max_score: 7, area_type: "GENERAL", isActive: true, possible_observations: ["بقع", "رائحة", "القائمة غير مكتملة", "القمامة غير مجمعة"] },
    { id: "g7", number: 7, name: "تلميع الإستانلس ستيل", max_score: 5, area_type: "GENERAL", isActive: true, possible_observations: ["غير نظيف", "صدأ"] },
    { id: "g8", number: 8, name: "النفايات العادية", max_score: 7, area_type: "GENERAL", isActive: true, possible_observations: ["مختلط", "ممتلئ", "غير مجمعة", "تلف بالحاوية"] },
    { id: "g9", number: 9, name: "معدات الوقاية الشخصية", max_score: 7, area_type: "GENERAL", isActive: true, possible_observations: ["غير متوفر", "غير معتمد", "تالف"] },
    { id: "g10", number: 10, name: "مكافحة العدوى", max_score: 6, area_type: "GENERAL", isActive: true, possible_observations: ["غير متوفر", "غير معتمد"] },
    { id: "g11", number: 11, name: "الاستجابة للطوارئ", max_score: 6, area_type: "GENERAL", isActive: true, possible_observations: ["متأخر", "غير مؤهل"] },
    { id: "g12", number: 12, name: "الزي الرسمي والنظافة الشخصية", max_score: 5, area_type: "GENERAL", isActive: true, possible_observations: ["غير متوفر", "غير معتمد", "غير مناسب"] },
    { id: "g13", number: 13, name: "الحاويات والعربات والمعدات", max_score: 10, area_type: "GENERAL", isActive: true, possible_observations: ["غير نظيف", "تلف بالعجلات", "غير كافٍ"] },
    { id: "g14", number: 14, name: "تخزين المواد الكيميائية", max_score: 5, area_type: "GENERAL", isActive: true, possible_observations: ["بدون MSDS", "رفوف غير مطابقة"] },
    { id: "g15", number: 15, name: "الالتزام بالتوجيهات الإدارية", max_score: 4, area_type: "GENERAL", isActive: true, possible_observations: ["لا", "نعم", "أخرى"] },

    // 🟡 MEDIUM RISK
    { id: "m1", number: 1, name: "نظافة السجاد", max_score: 3, area_type: "MED_RISK", isActive: true, possible_observations: ["غبار", "بقع", "رائحة"] },
    { id: "m2", number: 2, name: "الأرضيات والسلالم والأسقف", max_score: 6, area_type: "MED_RISK", isActive: true, possible_observations: ["غبار", "بقع", "صدأ"] },
    { id: "m3", number: 3, name: "تلميع الأرضيات الرخام/الفينيل", max_score: 6, area_type: "MED_RISK", isActive: true, possible_observations: ["يحتاج تنظيف", "يحتاج شمع"] },
    { id: "m4", number: 4, name: "أثاث المكاتب والكراسي", max_score: 4, area_type: "MED_RISK", isActive: true, possible_observations: ["غبار", "بقع"] },
    { id: "m5", number: 5, name: "استعمال المواد الكيميائية", max_score: 10, area_type: "MED_RISK", isActive: true, possible_observations: ["تاريخ", "قائمة", "تخفيف", "بدون ملصق"] },
    { id: "m6", number: 6, name: "الحمامات ودورات المياه", max_score: 7, area_type: "MED_RISK", isActive: true, possible_observations: ["بقع", "رائحة", "القائمة غير مكتملة", "القمامة غير مجمعة"] },
    { id: "m7", number: 7, name: "تلميع الإستانلس ستيل", max_score: 5, area_type: "MED_RISK", isActive: true, possible_observations: ["غير نظيف", "صدأ"] },
    { id: "m8", number: 8, name: "النفايات العادية", max_score: 6, area_type: "MED_RISK", isActive: true, possible_observations: ["مختلط", "ممتلئ", "غير مجمعة", "تلف"] },
    { id: "m9", number: 9, name: "معدات الوقاية الشخصية", max_score: 6, area_type: "MED_RISK", isActive: true, possible_observations: ["غير متوفر", "غير معتمد", "تالف"] },
    { id: "m10", number: 10, name: "النفايات الطبية", max_score: 10, area_type: "MED_RISK", isActive: true, possible_observations: ["مختلط", "ممتلئ", "غير مربوط"] },
    { id: "m11", number: 11, name: "مكافحة العدوى", max_score: 9, area_type: "MED_RISK", isActive: true, possible_observations: ["لا", "نعم", "أخرى"] },
    { id: "m12", number: 12, name: "الاستجابة للطوارئ", max_score: 7, area_type: "MED_RISK", isActive: true, possible_observations: ["متأخر", "غير مؤهل"] },
    { id: "m13", number: 13, name: "الزي الرسمي والنظافة الشخصية", max_score: 5, area_type: "MED_RISK", isActive: true, possible_observations: ["غير متوفر", "غير معتمد", "غير مناسب"] },
    { id: "m14", number: 14, name: "الحاويات والعربات والمعدات", max_score: 7, area_type: "MED_RISK", isActive: true, possible_observations: ["غير نظيف", "تلف بالعجلات", "غير كافٍ"] },
    { id: "m15", number: 15, name: "تخزين المواد الكيميائية", max_score: 5, area_type: "MED_RISK", isActive: true, possible_observations: ["بدون MSDS", "رفوف غير مطابقة"] },
    { id: "m16", number: 16, name: "الالتزام بالتوجيهات الإدارية", max_score: 4, area_type: "MED_RISK", isActive: true, possible_observations: ["لا", "نعم", "أخرى"] },

    // 🔴 HIGH RISK
    { id: "h1", number: 1, name: "الأرضيات والسلالم والأسقف", max_score: 6, area_type: "HIGH_RISK", isActive: true, possible_observations: ["غبار", "بقع", "صدأ"] },
    { id: "h2", number: 2, name: "تلميع الأرضيات الرخام/الفينيل", max_score: 6, area_type: "HIGH_RISK", isActive: true, possible_observations: ["يحتاج تنظيف", "يحتاج شمع"] },
    { id: "h3", number: 3, name: "استعمال المواد الكيميائية", max_score: 12, area_type: "HIGH_RISK", isActive: true, possible_observations: ["تاريخ", "قائمة", "تخفيف", "بدون ملصق"] },
    { id: "h4", number: 4, name: "نظافة المناطق الحرجة", max_score: 12, area_type: "HIGH_RISK", isActive: true, possible_observations: ["غير نظيف", "غير مطابق", "يحتاج تعقيم خاص"] },
    { id: "h5", number: 5, name: "الحمامات ودورات المياه", max_score: 6, area_type: "HIGH_RISK", isActive: true, possible_observations: ["بقع", "رائحة", "القائمة غير مكتملة", "القمامة غير مجمعة"] },
    { id: "h6", number: 6, name: "تلميع الإستانلس ستيل", max_score: 5, area_type: "HIGH_RISK", isActive: true, possible_observations: ["غير نظيف", "صدأ"] },
    { id: "h7", number: 7, name: "النفايات العادية", max_score: 6, area_type: "HIGH_RISK", isActive: true, possible_observations: ["مختلط", "ممتلئ", "غير مجمعة", "تلف"] },
    { id: "h8", number: 8, name: "معدات الوقاية الشخصية", max_score: 7, area_type: "HIGH_RISK", isActive: true, possible_observations: ["غير متوفر", "غير معتمد", "تالف"] },
    { id: "h9", number: 9, name: "النفايات الطبية", max_score: 10, area_type: "HIGH_RISK", isActive: true, possible_observations: ["مختلط", "ممتلئ", "غير مربوط"] },
    { id: "h10", number: 10, name: "مكافحة العدوى", max_score: 7, area_type: "HIGH_RISK", isActive: true, possible_observations: ["لا", "نعم", "أخرى"] },
    { id: "h11", number: 11, name: "الاستجابة للطوارئ", max_score: 5, area_type: "HIGH_RISK", isActive: true, possible_observations: ["متأخر", "غير مؤهل"] },
    { id: "h12", number: 12, name: "الزي الرسمي والنظافة الشخصية", max_score: 4, area_type: "HIGH_RISK", isActive: true, possible_observations: ["غير متوفر", "غير معتمد", "غير مناسب"] },
    { id: "h13", number: 13, name: "الحاويات والعربات والمعدات", max_score: 5, area_type: "HIGH_RISK", isActive: true, possible_observations: ["غير نظيف", "تلف بالعجلات", "غير كافٍ"] },
    { id: "h14", number: 14, name: "تخزين المواد الكيميائية", max_score: 5, area_type: "HIGH_RISK", isActive: true, possible_observations: ["بدون MSDS", "رفوف غير مطابقة"] },
    { id: "h15", number: 15, name: "الالتزام بالتوجيهات الإدارية", max_score: 4, area_type: "HIGH_RISK", isActive: true, possible_observations: ["لا", "نعم", "أخرى"] }
  ]
};
