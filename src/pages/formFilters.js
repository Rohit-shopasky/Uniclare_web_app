import { is } from "immutable";

export const formFilters = {
    dateFilter: (data) => {
        // console.log("data.length", data.length, data);
        if (data.indexOf("_") == -1)
            return true
        else
            return false;
    },

    qpCodeFilter: (data) => {
        // console.log("qpcodeLength", data.length, data);
        if (data.length == 1 || data.length == 5)
            return true
        else
            return false;
    },

    regNoFilter: (data) => {
        //console.log("regNo", data.length, data);
        if (data.length == 1 || data.length == 8)
            return true;
        else
            return false;
    },


    filterFields: async (data) => {
        let incorrectFields = [];
        let correctFields = [];
        await data.forEach(element => {

            element.type = element.type.toUpperCase();

            if (element.type == "DATEFROM" || element.type == "DATETO" || element.type == "DATE") {
                let isDateCorrect = formFilters.dateFilter(element.data);

                if (isDateCorrect == false)
                    incorrectFields.push(element.type);
                else
                    correctFields.push(element.type)
            }
            if (element.type == "QPCODEFROM" || element.type == "QPCODETO" || element.type == "QPCODE") {
                let isQpCodeCorrect = formFilters.qpCodeFilter(element.data);
                if (isQpCodeCorrect == false)
                    incorrectFields.push(element.type);
                else
                    correctFields.push(element.type)
            }
            if (element.type == "REGNOFROM" || element.type == "REGNOTO" || element.type == "REGNO") {
                let isregnoCorrect = formFilters.regNoFilter(element.data);
                if (isregnoCorrect == false)
                    incorrectFields.push(element.type.toUpperCase());
                else
                    correctFields.push(element.type)
            }
        });

        //console.log("correctFields", correctFields, "incorrect", incorrectFields);

        if (incorrectFields.length > 0) {
            if (incorrectFields.length > 1)
                return { status: false, fields: incorrectFields, msg: incorrectFields + " fields are incorrect!" }
            else
                return { status: false, fields: incorrectFields, msg: incorrectFields + " field is incorrect!" }
        }
        else
            return { status: true, fields: correctFields, msg: "" };

    }
};


