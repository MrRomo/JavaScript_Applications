$('#postComment').hide()
$('#btn-toggle-comment').click(e=>{
    e.preventDefault()
    $('#postComment').slideToggle()
})
$('#btn-like').click(function(e){
    e.preventDefault()
    let imageId = $(this).data('id')
    $.post('/images/'+imageId+'/like')
        .done(data=> {
            console.log(data)
            $('.likes-count').text(data.likes)
        })
})
$('#btn-delete').click(function(e){
    e.preventDefault()
    let $this = $(this)
    const response = confirm('Estas seguro de querer eliminar esta imagen?')
    if(response) {
        let imageId = $this.data('id')
        console.log(imageId)
        $.ajax({
            url: '/images/' + imageId,
            type: 'DELETE'
        })
        .done(function(result){
            $this.removeClass('btn-danger').addClass('btn-success')
            $this.find('i').removeClass('fa-times').addClass('fa-check')
            $this.append('<span>Deleted¡</span>')
            setTimeout(()=>{
                window.location.href = "/";
            }, 2000)

        })
    }
})