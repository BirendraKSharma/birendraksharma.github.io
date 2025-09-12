/**
 * Medium RSS Feed Fetcher
 * This script fetches and displays recent posts from a Medium profile
 * Simplified to only show post titles and links
 */

document.addEventListener('DOMContentLoaded', function() {
    const mediumUsername = 'birendrasharma0226'; // Your Medium username
    const maxPosts = 3; // Number of posts to display
    
    // Get the container where posts will be displayed
    const blogContainer = document.getElementById('medium-posts-container');
    
    if (!blogContainer) return;
    
    // Using rss2json API which is reliable for fetching RSS feeds
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
    
    // Fetch the Medium posts
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the request was successful
            if (data.status !== 'ok') {
                throw new Error('Failed to fetch posts');
            }
            
            // Clear container
            blogContainer.innerHTML = '';
            
            // Check if there are any posts
            if (!data.items || data.items.length === 0) {
                blogContainer.innerHTML = '<p>No posts found. Check back soon!</p>';
                return;
            }
            
            // Create a list to hold the posts
            const postList = document.createElement('ul');
            postList.className = 'blog-post-list';
            
            // Process and display each post (up to maxPosts)
            const displayCount = Math.min(data.items.length, maxPosts);
            
            for (let i = 0; i < displayCount; i++) {
                const post = data.items[i];
                const title = post.title;
                const link = post.link;
                
                // Create list item with just title and link
                const listItem = document.createElement('li');
                listItem.className = 'blog-post-item';
                listItem.innerHTML = `
                    <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>
                `;
                
                postList.appendChild(listItem);
            }
            
            // Add a link to Medium profile at the end
            const viewMoreItem = document.createElement('li');
            viewMoreItem.className = 'blog-post-view-more';
            viewMoreItem.innerHTML = `
                <a href="https://medium.com/@${mediumUsername}" target="_blank" rel="noopener noreferrer">
                    View all posts on Medium →
                </a>
            `;
            postList.appendChild(viewMoreItem);
            
            // Add the list to the container
            blogContainer.appendChild(postList);
        })
        .catch(error => {
            console.error('Error fetching Medium posts:', error);
            blogContainer.innerHTML = `
                <p>Unable to load blog posts.</p>
                <p><a href="https://medium.com/@${mediumUsername}" target="_blank" rel="noopener noreferrer">
                    View all posts on Medium →
                </a></p>
            `;
        });
});
