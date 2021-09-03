module.exports = nextJourney =  (currentJourney)=>{
    let journey = ['Journey 101','Journey 201','Journey 202','Journey 301','Journey 401'];
    let response;
    
    if(journey.indexOf(currentJourney) == journey.length - 1){
        response = "final"
        return  response 
        // return  response 
    }
    return journey[journey.indexOf(currentJourney)+1]
    // return journey[journey.indexOf(currentJourney)+1]
}