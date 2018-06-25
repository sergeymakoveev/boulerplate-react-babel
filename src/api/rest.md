# Эталонный REST сущности:
* базовый URL  
`/entities`
* взятие списка инстансов сущности  
`get /entities`
* взятие фильтрованного списка инстансов сущности  
`get /entities?filter1=value1&filter2=value2`
* создание инстанса сущности  
`post /entities {field1: value1, field2: value2}`
* взятие инстанса сущности  
`get /entities/id`
* обновление инстанса сущности (передается полный набор полей сущности, существующий набор перекрывается)  
`put /entities/id {field1: value1, field2: value2}`
* частичное изменение инстанса сущности (передается частичный набор полей сущности, существующий набор перекрывается только переданной частью полей сущности)  
`path /entities/id {field2: value2}`
* удаление инстанса сущности  
`delete /entities/id`
* групповые операции:  
обновление:  
`put /entities?ids=[] {field1: value1, field2: value2}`  
`put /entities?filter1=value1&filter2=value2 {field1: value1, field2: value2}`  
частичное изменение:  
`path /entities?ids=[] {field2: value2}`  
`path /entities?filter1=value1&filter2=value2 {field2: value2}`  
удаление:  
`delete /entities?ids=[]`  
`delete /entities?filter1=value1&filter2=value2`
