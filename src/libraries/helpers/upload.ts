import * as CryptoJS from 'crypto-js'

export function generateS3Filename(resourceId: number, resourceName: string): string {
    return `${Date.now()}-${resourceId}-${CryptoJS.MD5(resourceName).toString()}`
}

export function convertSizeImageToKB(size: number) {
    return Number((size / 1024).toFixed(0))
}

export function convertFileNameToUTF8(fileName: string) {
    return Buffer.from(fileName, 'latin1').toString('utf8')
}

export function regexGetExtension(fileName: string): string {
    const regex = /(?:\.([^.]+))?$/
    const match = fileName.match(regex)

    return match?.[1] || null
}

export function getFileNameWithoutExtension(filePath: string): string {
    const index = filePath.lastIndexOf('.')
    if (index < 0) {
        return filePath
    }
    return filePath.slice(0, index)
}

export function generateUniqueFileName(fileName: string): string {
    const unixTime = Date.now()
    const dataToHash = `${unixTime}-${fileName}`

    return CryptoJS.SHA256(dataToHash).toString(CryptoJS.enc.Hex)
}

/**
 * Updates the version suffix in an S3 key, or adds one if it doesn't exist.
 *
 * This function checks if a version identifier (e.g., "-ver-001") is present in the
 * key string. If found, it increments the version by 1 (e.g., "-ver-001" becomes "-ver-002").
 * If no version is found, it appends "-ver-001" before the file extension.
 *
 * @param {string} key - The original S3 key string.
 * @returns {string} - The updated key string with an incremented or added version suffix.
 */
export function updateVersionImagePathUpload(key: string): string {
    // Regular expression to find version pattern "-ver-XXX" before the file extension
    const versionPattern = /-ver-(\d+)(?=\.\w+$)/
    const match = key.match(versionPattern)

    if (match) {
        // If version exists, increment the current version
        const currentVersion = parseInt(match[1], 10)
        const nextVersion = String(currentVersion + 1).padStart(3, '0')
        return key.replace(versionPattern, `-ver-${nextVersion}`)
    } else {
        // If no version exists, add "-ver-001" before the file extension
        return key.replace(/(\.\w+)$/, '-ver-001$1')
    }
}
