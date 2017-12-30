'use strict';

(() => {
    const pollsWrapper = document.querySelector('#polls')
    const addPollButton = document.querySelector('.btn-add-poll')
    const pollApi = appUrl + '/polls'
    
    function updatePolls (data) {
        const polls = JSON.parse(data)
        let pollsHtml = ''
        polls.forEach((poll) => {
            pollsHtml += '<tr>'
            pollsHtml += '<td>'
            pollsHtml += poll.title
            pollsHtml += '</td>'
            
            pollsHtml += '<td>'
            pollsHtml += poll.author
            pollsHtml += '</td>'
            
            pollsHtml += '<td>'
            pollsHtml += poll.description
            pollsHtml += '</td>'
            pollsHtml += '</tr>'
        })
        pollsWrapper.innerHTML = pollsHtml
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', pollApi, updatePolls))
    
    addPollButton.addEventListener('click', function() {
      ajaxFunctions.ajaxRequest('POST', pollApi, function(data) {
          ajaxFunctions.ajaxRequest('GET', pollApi, updatePolls)
      })
   })
})();