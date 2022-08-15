var currentPage = 1

function loadPage(page) {
    currentPage = page
    $.ajax({
        url : '/user?page=' + page,
        type : 'GET'
    })
    .then(data => {
        $(`#content`).html('')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            var item = $(`
                <h1>${element.username} : ${element.password}</h1>
            `)
    
            $(`#content`).append(item)
        }
    })
    .catch(err => {
        console.log('API lỗi')
    })
}

function nextPage() {
    currentPage++
    $.ajax({
        url : '/user?page=' + currentPage,
        type : 'GET'
    })
    .then(data => {
        $(`#content`).html('')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            var item = $(`
                <h1>${element.username} : ${element.password}</h1>
            `)
    
            $(`#content`).append(item)
        }
    })
    .catch(err => {
        console.log('API lỗi')
    })
}

function prePage() {
    currentPage--
    $.ajax({
        url : '/user?page=' + currentPage,
        type : 'GET'
    })
    .then(data => {
        $(`#content`).html('')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            var item = $(`
                <h1>${element.username} : ${element.password}</h1>
            `)
    
            $(`#content`).append(item)
        }
    })
    .catch(err => {
        console.log('API lỗi')
    })
}

