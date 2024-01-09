document.getElementById('selectBox').addEventListener('change', function() {
    ['div1', 'div2', 'div3'].forEach(function(id) {
      document.getElementById(id).style.display = 'none';
    });
    document.getElementById(this.value).style.display = 'block';
  });
  