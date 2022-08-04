export const CapitalizeString = (str: string): string => {
    let strArr = str.split('.')[0].toLowerCase()
    if (strArr === 'html5') return 'HTML5'
    if (strArr === 'css') return 'CSS'

    let prefix = strArr
    let suffix = ''

    if (strArr.endsWith('io')) {
        prefix = strArr.split('io')[0]
        suffix = 'IO'
    } else if (strArr.endsWith('db')) {
        prefix = strArr.split('db')[0]
        suffix = 'DB'
    } else if (strArr.endsWith('ui')) {
        prefix = strArr.split('ui')[0]
        suffix = 'DB'
    } else if (strArr.endsWith('js')) {
        prefix = strArr.split('js')[0]
        suffix = 'JS'
    }

    return prefix[0].toUpperCase() + prefix.substring(1).toLowerCase() + suffix
}
