// select element
const selectName = document.querySelector('#select-name')
const selectOrigin = document.querySelector('#select-origin')
const selectDestination = document.querySelector('#select-destination')
const selectTime = document.querySelector('#select-time')
const submitBtn = document.querySelector('#submit')
const cart = document.querySelector('#cart')
// select element


// onload //
let ticket = []
document.addEventListener('DOMContentLoaded', () => {
    ticket = JSON.parse(localStorage.getItem('allTicket')) || []
    addToCart(ticket)
})
// onload //


// one ticket
const userSelected = {
    name: '',
    origin: '',
    destination: '',
    time: '',
    price: ''
}
// one ticket


// get value in select menu
selectName.addEventListener('change', e => userSelected.name = e.target.value)

selectOrigin.addEventListener('change', e => userSelected.origin = e.target.value)

selectDestination.addEventListener('change', e => {
    userSelected.destination = e.target.value
    switch (userSelected.destination) {
        case 'Tehran':
            userSelected.price = '290000'
            break
        case 'Hamedan':
            userSelected.price = '390000'
            break
        case 'Gilan':
            userSelected.price = '255000'
            break
        case 'Mashhad':
            userSelected.price = '490000'
            break
        case 'Esfahan':
            userSelected.price = '300000'
            break
        case 'Shiraz':
            userSelected.price = '350000'
            break
    }
})

selectTime.addEventListener('change', e => userSelected.time = e.target.value)
// get value in select menu


// set ticket
let flag = 0
submitBtn.addEventListener('click', () => {
    flag = 0
    for (const item in userSelected) {
        if (!userSelected[item]) flag++
    }
    if (flag == 0) {
        if (userSelected.origin === userSelected.destination) {
            swal({
                timer: 3000,
                title: "The origin and destination cannot be the same !!",
                icon: "warning",
            })
        } else {
            const newTicket = { ...userSelected, id: new Date().getTime() }
            ticket.push(newTicket)
            // add to cart
            addToCart(ticket)
            // add to localStorage
            localStorage.setItem('allTicket', JSON.stringify(ticket))
            for (const item in userSelected) {
                userSelected[item] = ''
            }
            selectName.value = selectName.querySelector('option[disabled]').value
            selectOrigin.value = selectOrigin.querySelector('option[disabled]').value
            selectDestination.value = selectDestination.querySelector('option[disabled]').value
            selectTime.value = selectTime.querySelector('option[disabled]').value
        }
    } else {
        swal({
            timer: 3000,
            title: "All options must be selected !!",
            icon: "warning",
        })
    }
})
// set ticket


// add to dom
function addToCart(ticket) {
    cart.innerHTML = ''
    ticket.forEach(item => {
        const newCart = document.createElement('div')
        newCart.className = 'w-full py-3 px-5 flex items-center justify-start *:font-semibold *:text-sm *:w-[20%] *:capitalize border-t border-t-yellow-400'
        newCart.innerHTML = `<p class="content">${item.name}</p>
                        <p class="content">${item.origin}</p>
                        <p class="content">${item.destination}</p>
                        <p class="content">${item.time}</p>
                        <p class="flex items-center">
                            <span class="content">${item.price}</span>
                            <i data-id="${item.id}" class="bi bi-trash3 text-2xl block ml-auto text-gray-900 cursor-pointer delete-ticket"></i>
                        </p>`
        cart.append(newCart)
    })

    const deleteTicketBtn = document.querySelectorAll('.delete-ticket')
    deleteTicketBtn.forEach(btn => {
        btn.addEventListener('click', removeTicket)
    })
}
// add to dom


// remove ticket
function removeTicket(e) {
    let selectedTicket = e.target.dataset.id
    ticket = ticket.filter(t => t.id != selectedTicket)
    // add to cart
    addToCart(ticket)
    // add to localStorage
    localStorage.setItem('allTicket', JSON.stringify(ticket))
}
// remove ticket