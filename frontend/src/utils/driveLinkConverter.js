export const convertDriveLink = (url) => {
  if (!url) return '';
  // Check if it's a google drive link
  if (url.includes('drive.google.com')) {
    // Extract ID using regex
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?id=${match[1]}`;
    }
  }
  return url; // return as is if not a drive link
};
