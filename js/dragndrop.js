document.addEventListener('DOMContentLoaded', () => {

    const appIcons = document.querySelectorAll('.app-icon-container');

    appIcons.forEach(icon => {
        icon.setAttribute('draggable', true);

        icon.addEventListener('dragstart', e => {
            // Store the icon element in the data transfer object so it can be accessed in the drop event
            e.dataTransfer.setData('icon', icon);
        });

        icon.addEventListener('drag', e => {
            // You can add some visual effects to the icon element here as it is being dragged, like changing its opacity
            icon.style.opacity = '0.5';
        });

        icon.addEventListener('dragend', e => {
            // Remove any visual effects applied to the icon element
            icon.style.opacity = '1';
        });
    });

    const appsContainer = document.getElementById('apps-container');

    appsContainer.addEventListener('dragover', e => {
      e.preventDefault();
    });

    appsContainer.addEventListener('drop', e => {
      const icon = e.dataTransfer.getData('icon');
      appsContainer.appendChild(icon);
    });
});

