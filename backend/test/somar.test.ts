import { somar } from "@/index";

test('Deve somar dois números', ()=>{
    expect(somar(1,2)).toBe(3)
})