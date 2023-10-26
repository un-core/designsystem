export default function removeSegmentIfMatch(url) {
    // Split the URL into segments
    const segments = url.split('/');

    // Check the last segment
    const lastSegment = segments[segments.length - 1];

    if (lastSegment === 'code' || lastSegment === 'props') {
        // Remove the last segment
        segments.pop();
    }

    // Join the segments back into a URL
    return segments.join('/');
}
