var dates = {
    monthNames: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
        "Iul", "Aug", "Sep", "Oct", "Noi", "Dec"
    ],
    monthNumbers: {
        Ian: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        Mai: 4,
        Iun: 5,
        Iul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Noi: 10,
        Dec: 11
    },
    convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0], d[1], d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year, d.month, d.date) :
            NaN
        );
    },
    compare: function (a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a = this.convert(a).valueOf()) &&
            isFinite(b = this.convert(b).valueOf()) ?
            (a > b) - (a < b) :
            NaN
        );
    },
    inRange: function (d, start, end) {
        /*start = dates.addDays(new Date(start), 1);
        end = dates.addDays(new Date(end), -1);*/
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d = this.convert(d).valueOf()) &&
            isFinite(start = this.convert(start).valueOf()) &&
            isFinite(end = this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    },
    toDate: function (a) {
        let arr = a.split(" ");
        arr[0] = parseInt(arr[0]);
        arr[1] = dates.monthNumbers[arr[1]];
        arr[2] = parseInt(arr[2]);
        return new Date(arr[2], arr[1], arr[0]);
    },
    toString: function (d) {
        if (typeof d == 'object')
            return `${d.getDate()} ${dates.monthNames[d.getMonth()]} ${d.getFullYear()}`;
        if (String(d) === d)
            return d;
        return "Not a date";
    },
    sortByDate: function (a, b) { //a,b obiecte de tip {date1:... , date2:... ,suma:...} 
        return dates.compare(dates.toDate(a.date1), dates.toDate(b.date1))
    },
    addDays: function (date, days) {
        date = new Date(date.setDate(date.getDate() + days));
        return date;
    },
    addMonths: function (date, months) {
        var d = new Date(date.setMonth(date.getMonth() + months));
        return d;
    },
    exists: function (dateObj, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].date1 == dateObj.date1)
                return true;
            if (arr[i].date2 == dateObj.date2)
                return true;
        }

        return false;
    },
    getMonth:function(date){
    let parts=dates.toString(date).split(" ");
    return `${parts[1].toUpperCase()} ${parts[2]}`
    },
    generateDates: function (arr) {
        if (arr.length <= 1) {
            /*
            let d1=dates.toDate(arr[0].date1);
            let s1=dates.toDate(arr[0].date2);
            */

            let newArr = [];
            let d1,d2,d3,d4,s1,s2,s3,s4;
            if (arr.length == 0){
                d1 = new Date();
                d2 = dates.addMonths(new Date(d1), 1);
                d3 = dates.addMonths(new Date(d1), 2);
                d4 = dates.addMonths(new Date(d1), 3);

                s1 = dates.addMonths(new Date(d1), 1);
                s2 = dates.addMonths(new Date(d2), 1);
                s3 = dates.addMonths(new Date(d3), 1);
                s4 = dates.addMonths(new Date(d4), 1);

                s1 = dates.toString(dates.addDays(s1, -1));
                s2 = dates.toString(dates.addDays(s2, -1));
                s3 = dates.toString(dates.addDays(s3, -1));
                s4 = dates.toString(dates.addDays(s4, -1));
            }
            else{
                d1 = dates.toDate(arr[0].date1);
                s1 = dates.toDate(arr[0].date2);
                d2 = dates.addMonths(new Date(s1), 1);
                d3 = dates.addMonths(new Date(s1), 2);
                d4 = dates.addMonths(new Date(s1), 3);

                s2 = dates.addMonths(new Date(d2), 1);
                s3 = dates.addMonths(new Date(d3), 1);
                s4 = dates.addMonths(new Date(d4), 1);

                s1 = dates.toString(s1);
                s2 = dates.toString(dates.addDays(s2, -1));
                s3 = dates.toString(dates.addDays(s3, -1));
                s4 = dates.toString(dates.addDays(s4, -1));
            }
                
            d1 = dates.toString(d1);
            d2 = dates.toString(d2);
            d3 = dates.toString(d3);
            d4 = dates.toString(d4);

            if (arr.length == 0) {
                newArr.push({
                    date1: d1,
                    date2: s1,
                    inregistrat: false
                }, {
                    date1: d2,
                    date2: s2,
                    inregistrat: false
                }, {
                    date1: d3,
                    date2: s3,
                    inregistrat: false
                }, {
                    date1: d4,
                    date2: s4,
                    inregistrat: false
                });
            } else {
                newArr.push({
                    date1: d1,
                    date2: s1,
                    inregistrat: true,
                    dataAchitare: arr[0].dataAchitare,
                    suma: arr[0].suma
                })

                newArr.push({
                    date1: d2,
                    date2: s2,
                    inregistrat: false
                }, {
                    date1: d3,
                    date2: s3,
                    inregistrat: false
                }, {
                    date1: d4,
                    date2: s4,
                    inregistrat: false
                });
            }
            
            let today = new Date();
            newArr.forEach(item => {
                if (dates.compare(dates.addDays(dates.toDate(item.date1),1), today) <= 0)
                    item["passed"] = true;
            })


            return newArr;
        } else if (arr.length >= 2) {
            let today = new Date();
            arr = arr.sort(dates.sortByDate);
            let newArr = [];
            let newArrIndex = 0;
            let arrIndex = 0;
            newArr.push({
                date1: arr[arrIndex].date1,
                date2: arr[arrIndex].date2,
                inregistrat: true,
                dataAchitare: arr[arrIndex].dataAchitare,
                suma: arr[arrIndex].suma
            })
            arrIndex++;

            while (arrIndex < arr.length) {
                let d1 = new Date(dates.toDate(newArr[newArrIndex].date2));
                let s1 = dates.addMonths(new Date(d1), 1);
                if (!dates.inRange(s1, dates.toDate(arr[arrIndex].date1), dates.toDate(arr[arrIndex].date2)) && !dates.inRange(dates.toDate(arr[arrIndex].date1), d1, s1)) {
                    newArr.push({
                        date1: dates.toString(dates.addDays(d1, 1)),
                        date2: dates.toString(dates.addDays(s1, -1)),
                        inregistrat: false
                    });
                    newArrIndex++;
                } else {

                    if (!dates.exists({
                            date1: dates.toString(dates.addDays(new Date(d1), 1)),
                            date2: dates.toString(dates.addDays(dates.toDate(arr[arrIndex].date1), -1))
                        }, arr)) {
                        newArr.push({
                            date1: dates.toString(dates.addDays(new Date(d1), 1)),
                            date2: dates.toString(dates.addDays(dates.toDate(arr[arrIndex].date1), -1)),
                            inregistrat: false
                        });
                        newArrIndex++;
                    }

                    newArr.push({
                        date1: dates.toString(arr[arrIndex].date1),
                        date2: dates.toString(arr[arrIndex].date2),
                        inregistrat: true,
                        dataAchitare: arr[arrIndex].dataAchitare,
                        suma: arr[arrIndex].suma
                    });
                    arrIndex++;
                    newArrIndex++;
                }

            }


            while (newArr.length < 4) {
                let d1 = new Date(dates.toDate(newArr[newArr.length - 1].date2));
                let s1 = new Date(dates.addMonths(d1, 1));
                d1 = dates.addDays(d1, 1);
                s1 = dates.addDays(s1, -1);
                newArr.push({
                    date1: dates.toString(d1),
                    date2: dates.toString(s1)
                })
            }

            newArr.forEach(item => {
                if (dates.compare(dates.toDate(item.date1), today) < 0)
                    item["passed"] = true;
            })

            
            return newArr;

        }
    }
}

module.exports = dates;