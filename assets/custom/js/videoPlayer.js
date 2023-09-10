const videoContainers = document.querySelectorAll('.embed-responsive');

videoContainers.forEach((container) => {
    container.addEventListener('click', (e) => {
        e.preventDefault();
        const iframe = container.querySelector('iframe');
        const embedUrl = iframe.src;

        // Display the video in a modal or a lightbox
        // You can implement your modal or lightbox solution here
        // For simplicity, here's a basic example:
        openVideoModal(embedUrl);
    });
});

function openVideoModal(embedUrl) {
    // Implement your modal or lightbox logic here
    // You can use libraries like Bootstrap Modal or create a custom one
    // Display the embedded YouTube video within the modal
    // Here's a basic example using a Bootstrap Modal:
    
    // Create a Bootstrap Modal with an iframe
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <iframe width="100%" height="400" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    `;

    // Add the modal to the body and show it
    document.body.appendChild(modal);
    $(modal).modal('show');

    // Remove the modal from the DOM when it's closed
    $(modal).on('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}