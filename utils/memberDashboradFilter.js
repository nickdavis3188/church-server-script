const dataFilter = {
    yearFilter:(data,selectedYear = new Date().getFullYear())=>{   
        return data.filter((e)=>e.Year = selectedYear)
    },
    
    dashboradFilter:(yearFilterdData,selectedYear = new Date().getFullYear())=>{
        // let membersTotal = 0;
        // membersTotal += data.length;
        var totalMalePreMonth = []
        var totalFemalePreMonth = []
        
        // const male = yearFilterdData.filter((e)=> e.sex =='male')
        const femaleJan = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==1)
        const femaleFeb = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==2)
        const femaleMac = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==3)
        const femaleApl = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==4)
        const femaleMy = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==5)
        const femaleJn = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==6)
        const femaleJl = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==7)
        const femaleAug = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==8)
        const femaleSep = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==9)
        const femaleOct = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==10)
        const femaleNov = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==11)
        const femaleDec = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==12)
        
        //male
        const maleJan = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==1)
        const maleFeb = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==2)
        const maleMac = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==3)
        const maleApl = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==4)
        const maleMy = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==5)
        const maleJn = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==6)
        const maleJl = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==7)
        const maleAug = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==8)
        const maleSep = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==9)
        const maleOct = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==10)
        const maleNov = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==11)
        const maleDec = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==12)
        // const femaleMonth = female.filter((e)=> e.monthCreated == 1)
        
        // const totalfeb = femaleFeb.reduce(function(x,y){return x+y},0)
        //male
        totalMalePreMonth.push(maleJan.length)
        totalMalePreMonth.push(maleFeb.length)
        totalMalePreMonth.push(maleMac.length)
        totalMalePreMonth.push(maleApl.length)
        totalMalePreMonth.push(maleMy.length)
        totalMalePreMonth.push(maleJn.length)
        totalMalePreMonth.push(maleJl.length)
        totalMalePreMonth.push(maleAug.length)
        totalMalePreMonth.push(maleSep.length)
        totalMalePreMonth.push(maleOct.length)
        totalMalePreMonth.push(maleNov.length)
        totalMalePreMonth.push(maleDec.length)
        
        //female
        totalFemalePreMonth.push(femaleJan.length)
        totalFemalePreMonth.push(femaleFeb.length)
        totalFemalePreMonth.push(femaleMac.length)
        totalFemalePreMonth.push(femaleApl.length)
        totalFemalePreMonth.push(femaleMy.length)
        totalFemalePreMonth.push(femaleJn.length)
        totalFemalePreMonth.push(femaleJl.length)
        totalFemalePreMonth.push(femaleAug.length)
        totalFemalePreMonth.push(femaleSep.length)
        totalFemalePreMonth.push(femaleOct.length)
        totalFemalePreMonth.push(femaleNov.length)
        totalFemalePreMonth.push(femaleDec.length)
    
        if(selectedYear == new Date().getFullYear()){
            let finalMale = totalMalePreMonth.slice(0,new Date().getMonth())
            let finalFemale = totalFemalePreMonth.slice(0,new Date().getMonth())
            return {male:finalMale,female:finalFemale}
        }
        return {male:totalMalePreMonth,female:totalFemalePreMonth}
    }
}

module.exports = dataFilter