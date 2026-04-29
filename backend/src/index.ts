export function somar(n1: number, n2: number) {
    return n1 + n2
}

import { randFullName } from '@ngneat/falso'

async function main() {
    console.log(somar(2, 4))
    console.log(randFullName())
}

void main()