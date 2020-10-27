  import "./style/common.less"
  function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }
  console.log($)

  document.body.appendChild(component());