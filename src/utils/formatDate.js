export  function formatDate(dateString){
    if (!dateString) return "No date";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())){
        return "Invalid date"
    }

    return date.toLocaleDateString("en-GB",{
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}