$(function() { 
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    
    $('#spendAmount').click(function() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            // console.log("amount bef---->",amount)

            if(amount) {
                // console.log("amount Aftr---->",amount)
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){
                console.log("budget.limit--->",budget.limit)
                console.log("amooo--->",amount)

                if(amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type:"basic",
                        iconUrl:"128px.png",
                        title:"Limit Reached !",
                        message:"Uh oh! You have Reached Your Limits!"
                    };
                    // chrome.notifications.create('limitNotif',notifOptions);
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});
