import React from "react";
import { MainPhone } from "constants/phoneTypes";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import moment from "moment";

export const CallOperatorLC = (data: any, date: string) => {
  return (
    <>
      <h1 className="c-title">ТРУДОВОЙ ДОГОВОР №____</h1>
      <div className="v-flex">
        <span>г. Ташкент</span>
        <span>{moment(date).format("« DD » MMMM YYYY г.")}</span>
      </div>
      <p>
        Настоящий трудовой договор (<b>«Договор»</b>) на позицию{" "}
        <b>Оператор колл-центра</b> заключен между:
      </p>
      <p className="s-flex">
        <div className="number">(1)</div>
        <p className="fill">
          ООО «INTEST MAX» (<b>«Работодатель»</b> или <b>«Общество»</b>),
          созданным и существующим в соответствии с законодательством Республики
          Узбекистан, в лице директора Косимова С.Р., действующего на основании
          Устава, с одной стороны, и
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(2)</div>
        <p className="fill">
          {data?.fullName}, гражданином Республики Узбекистан (<b>«Работник»</b>
          ), с другой стороны, совместно именуемые <b>«Стороны»</b>, а каждый в
          отдельности – <b>«Сторона»</b>.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">1.</div>
        <p className="fill">
          <b>ПРЕДМЕТ ДОГОВОРА</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">1.1.</div>
        <p className="fill">
          Работодатель обязуется предоставить Работнику работу согласно п. 2.4
          Договора, обеспечить условия труда, предусмотренные трудовым
          законодательством и иными нормативными правовыми актами, содержащими
          нормы трудового права, своевременно и в полном размере выплачивать
          работнику заработную плату, а Работник обязуется лично выполнять
          определенные настоящим Договором трудовые функции на условиях
          настоящего Договора.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">2.</div>
        <p className="fill">
          <b>МЕСТО РАБОТЫ И ТРУДОВЫЕ ОБЯЗАННОСТИ</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">2.1.</div>
        <p className="fill">
          Постоянное место работы работника находится в филиале Работодателя в
          г. Ташкенте.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">2.2.</div>
        <p className="fill">
          В то же время, Работник может быть направлен в командировки в пределах
          территории Республики Узбекистан или за границу в соответствии с
          инструкциями Работодателя. Все расходы, обоснованно понесенные
          Работником в течение командировки, подлежат возмещению в соответствии
          с законодательством при условии их документального подтверждения.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">2.3.</div>
        <p className="fill">
          Работа по настоящему Договору является для Работника основной.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">2.4.</div>
        <p className="fill">
          Работник принимается на должность <b>Оператор колл-центра.</b>{" "}
          Перечень основных трудовых обязанностей Работника приводится в{" "}
          <b>Приложении №1</b> к настоящему Договору, а также определяется
          действующим законодательством, и внутренними документами Общества.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">3.</div>
        <p className="fill">
          <b>ПРАВА И ОБЯЗАННОСТИ РАБОТНИКА</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">3.1.</div>
        <p className="fill">Работник имеет право на:</p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.1.1</div>
        <p className="fill">
          предоставление ему работы, обусловленной настоящим Договором;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.1.2</div>
        <p className="fill">
          рабочее место, которое соответствует условиям организации труда и
          безопасности на рабочем месте, установленным законодательством;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.1.3</div>
        <p className="fill">
          своевременную и полную выплату заработной платы в соответствии с
          условиями, изложенными в разделе 5 настоящего Договора;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.1.4</div>
        <p className="fill">
          отдых, в том числе оплачиваемый ежегодный отпуск, еженедельные
          выходные дни, нерабочие праздничные дни;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.1.5</div>
        <p className="fill">
          полную и достоверную информацию об условиях труда и требованиях охраны
          труда на рабочем месте;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.1.6</div>
        <p className="fill">
          защиту своих трудовых прав и свобод и законных интересов всеми
          способами, которые не запрещены законом.
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.1.7</div>
        <p className="fill">
          иные права, установленные действующим законодательством Республики
          Узбекистан.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">3.2.</div>
        <p className="fill">Работник обязан:</p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.1</div>
        <p className="fill">
          добросовестно исполнять свои должностные обязанности, выполнять
          требования иных обязательных инструкций и соблюдать действующее
          законодательство;
        </p>
      </p>
      <p className="s-flex pl mb-space">
        <div className="number">3.2.2</div>
        <p className="fill">
          соблюдать локальные акты Работодателя, а также правила безопасности
          труда, трудовые и санитарные правила и нормы;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.3</div>
        <p className="fill">
          с должной осторожностью использовать имущество Работодателя, в том
          числе офисное оборудование и иное вверенное имущество;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.4</div>
        <p className="fill">
          соблюдать полную сохранность и конфиденциальность в отношении
          документов и информации об Обществе;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.5</div>
        <p className="fill">
          не разглашать информацию, которая стала известной Работнику в силу его
          должностных обязанностей, в частности, в тех случаях, когда указанная
          информация относится к коммерческой тайне или конфиденциальной
          информации Работодателя;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.6</div>
        <p className="fill">
          бережно относиться к имуществу Работодателя и других работников;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.7</div>
        <p className="fill">
          уведомлять Работодателя о всех значительных обстоятельствах, в
          частности, личного характера, в том числе об угрозе жизни или
          здоровью, возможном ограничении в правах, инициировании уголовного или
          административного преследования, или предъявления гражданского иска,
          которые относятся или могут негативным образом повлиять на выполнение
          Работником его трудовых обязанностей, а также на хозяйственную
          деятельность и репутацию Работодателя;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.8</div>
        <p className="fill">
          немедленно сообщать Работодателю и документировать причину возможного
          отсутствия, если Работник не способен выполнять свои трудовые функции.
          Работник должен предоставить Работодателю медицинскую справку или
          любой другой обоснованный документ, оправдывающий его отсутствие.
          Работодатель сохраняет за собой право потребовать медицинскую справку
          или любой другой обоснованный документ также за период отсутствия
          Работника;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.9</div>
        <p className="fill">
          немедленно сообщать в письменном виде Работодателю о намерении
          вступить в трудовые отношения с другим Работодателем;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.10</div>
        <p className="fill">
          относиться к другим работникам и иным лицам с уважением, с которыми
          Работник имеет контакты по работе, независимо от их пола, семейного
          положения, религии, цвета кожи, расовой, этнической и национальной
          принадлежности или имеющихся у них ограниченных возможностей;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">3.2.11</div>
        <p className="fill">
          относиться к другим работникам и иным лицам с уважением, с которыми
          Работник имеет контакты по работе, независимо от их пола, семейного
          положения, религии, цвета кожи, расовой, этнической и национальной
          принадлежности или имеющихся у них ограниченных возможностей;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">4.</div>
        <p className="fill">
          <b>ПРАВА И ОБЯЗАННОСТИ РАБОТОДАТЕЛЯ</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">4.1.</div>
        <p className="fill">Работодатель обязуется:</p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.1.1</div>
        <p className="fill">
          предоставить Работнику работу на условиях, установленных настоящим
          Договором и требованиями законодательства Республики Узбекистан;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.1.2</div>
        <p className="fill">
          выплачивать Работнику заработную плату в соответствии с условиями,
          изложенными в разделе 5 настоящего Договора;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.1.3</div>
        <p className="fill">
          обеспечивать условия труда в соответствии с требованиями безопасности
          и охраны труда, установленными законодательством Республики
          Узбекистан;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.1.4</div>
        <p className="fill">
          обеспечивать Работника оборудованием, инструментами, технической
          документацией и иными средствами, необходимыми для исполнения ими
          своих трудовых обязанностей;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.1.5</div>
        <p className="fill">
          производить обязательные взносы в государственные внебюджетные фонды;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.1.6</div>
        <p className="fill">
          получать и обрабатывать персональные данные Работника в объеме,
          предусмотренном законодательством Республики Узбекистан.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">4.2</div>
        <p className="fill">Работодатель имеет право:</p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.2.1</div>
        <p className="fill">
          требовать от Работника исполнения трудовых обязанностей и бережного
          отношения к имуществу Работодателя и других работников, соблюдения
          обязанностей, указанных в <b>Приложении №1;</b>
        </p>
      </p>
      <p className="s-flex pl mb-space">
        <div className="number">4.2.2</div>
        <p className="fill">
          привлекать Работника к дисциплинарной и материальной ответственности в
          порядке, установленном действующим законодательством.
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">4.2.3</div>
        <p className="fill">
          Привлекать на работу в праздничные нерабочие дни.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">5.</div>
        <p className="fill">
          <b>УСЛОВИЯ ОПЛАТЫ</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">5.1</div>
        <p className="fill">
          Ежемесячная заработная плата определяется штатным расписанием
          заработной платы сотрудников.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">5.2</div>
        <p className="fill">
          Ежемесячная заработная плата Работника рассчитывается и выплачивается
          Работодателем на счет Работника в банке в соответствии с
          законодательством не позднее 8 рабочих дней нового месяца, следующего
          за тем, в котором Работник осуществлял работу.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">5.3</div>
        <p className="fill">
          Работодателем могут устанавливаться доплаты, надбавки и поощрительные
          выплаты. Размеры и условия таких доплат, надбавок и поощрительных
          выплат могут быть определены в локальных актах Общества.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">6.</div>
        <p className="fill">
          <b>РАБОЧЕЕ ВРЕМЯ И ВРЕМЯ ОТДЫХА</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">6.1</div>
        <p className="fill">
          <p>
            Работнику устанавливается суммированный учет рабочего времени
            следующим образом:
          </p>
          <p>
            с 07:30 ч. по 13:30 ч. – для работающих в дневное время, при этом
            перерыв с 10:30 до 11:00 (30 минут);
          </p>
          <p>
            с 13:30 ч. по 20:15 ч. – для работающих в вечернее время, при этом
            перерыв с 16:30 до 17:00 (30 минут).
          </p>
          <p>Выходным днем является воскресенье.</p>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">6.2</div>
        <p className="fill">
          Работник имеет право на ежегодный оплачиваемый отпуск на согласованный
          период между работодателем и работником.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">6.3</div>
        <p className="fill">
          С согласия Работодателя, Работнику может быть предоставлен
          неоплачиваемый отпуск. При этом предоставление отпуска не должно
          препятствовать нормальной хозяйственной деятельности Общества.
          Указанный неоплачиваемый отпуск может быть предоставлен по семейным
          обстоятельствам или по иным уважительным причинам.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">7.</div>
        <p className="fill">
          <b>СРОК ДЕЙСТВИЯ ДОГОВОРА</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">7.1</div>
        <p className="fill">
          Дата начала работы является днем следующим за датой подписания
          Договора.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">7.2</div>
        <p className="fill">
          Настоящий Договор заключен на 2 (два) года, вступает в силу с момента
          подписания Договора, но не ранее с даты начала работы (п. 7.1
          Договора).
        </p>
      </p>
      <p className="s-flex">
        <div className="number">7.3</div>
        <p className="fill">
          По настоящему Договору Работнику устанавливается испытательный срок 3
          (три) месяца со дня фактического начала работы. В срок испытания не
          включаются периоды, когда Работник фактически отсутствовал на работе.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">8.</div>
        <p className="fill">
          <b>ПРОИЗВОДСТВЕННОЕ ОБУЧЕНИЕ (ПОВЫШЕНИЕ КВАЛИФИКАЦИИ)</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">8.1</div>
        <p className="fill">
          Настоящий Договор может быть прекращен в соответствии с порядком и по
          основаниям, предусмотренным трудовым законодательством Республики
          Узбекистан.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">8.2</div>
        <p className="fill">
          Настоящий Договор может быть прекращен по инициативе Работника
          согласно Трудовому кодексу Республики Узбекистан. При этом Работник
          обязан оповестить Работодателя о прекращении Договора не менее чем за
          14 календарных дней, при этом Работник уплачивает неустойку,
          предусмотренную в пункте 11.2.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">8.3</div>
        <p className="fill">
          Настоящий Договор может быть прекращен в любое время по соглашению
          между Работодателем и Работником. Если Работник планирует прекратить
          трудовой договор по данному основанию, Работнику требуется оповестить
          Работодателя о прекращении Договора не менее чем за 3 (три) месяца.
          При этом, Работник не выплачивает Работодателю неустойку,
          предусмотренную пунктом 11.2.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">9.</div>
        <p className="fill">
          <b>КОНФИДЕНЦИАЛЬНАЯ ИНФОРМАЦИЯ</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">9.1</div>
        <p className="fill">
          Работник обязуется в течение срока действия настоящего Договора, а
          также в течение 5 (пяти) лет после прекращения настоящего Договора (за
          исключением случаев, когда это требуется на основании норм
          действующего законодательства):
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">9.1.1</div>
        <p className="fill">
          <p className="mb-space">
            не разглашать третьим лицам, а также не допускать получения такими
            лицами какой- либо информации (сведений) в отношении хозяйственной
            и/или финансовой деятельности Общества, включая, в том числе,
            информацию (сведения), относящуюся (-иеся) к планам и намерениям,
            условиям делового оборота или
          </p>
          финансовому состоянию Работодателя, к сделкам и деятельности
          Работодателя или клиентам Работодателя, а также каким-либо «ноу-хау»
          или секретам производства, относящимся к продукции и услугам,
          производимым и оказываемым Работодателем (
          <b>«Конфиденциальная информация»</b>), или
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">9.1.2</div>
        <p className="fill">
          не использовать или не пытаться использовать какую-либо
          Конфиденциальную информацию в собственных интересах любым образом,
          который причиняет либо может причинить прямо или косвенно ущерб
          интересам Работодателя, или не использовать такую информацию в иных
          целях, помимо необходимых для выполнения своих служебных обязанностей
          по настоящему Договору и в соответствии с должностной инструкцией.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">9.2</div>
        <p className="fill">
          В течение срока работы по настоящему Договору Работник должен
          принимать все меры к тому, чтобы информировать Работодателя о
          предполагаемых или осуществленных незаконных публикациях, а также о
          несанкционированном разглашении Конфиденциальной информации или
          какой-либо ее части.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">9.3</div>
        <p className="fill">
          Любые документы, бумаги, заметки, меморандумы, пленки, фильмы,
          фотографии, планы, чертежи, компьютерные записи в любой форме, в том
          числе на дискетах, по вопросам, относящимся к коммерческой
          деятельности Работодателя либо касающимся каких-либо сделок или дел
          Работодателя, или клиентов Работодателя, включая документы,
          подготовленные Работником в течение всего срока его работы у
          Работодателя, принадлежат Работодателю и являются его исключительной
          собственностью (<b>«Документы»</b>).
        </p>
      </p>
      <p className="s-flex">
        <div className="number">9.4</div>
        <p className="fill">
          В период работы у Работодателя и по ее окончании Работник не должен
          раскрывать, использовать или способствовать использованию каких-либо
          Документов иначе как в интересах Работодателя.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">9.5</div>
        <p className="fill">
          <p>
            В случае нарушения положений, установленных в разделе 9 настоящего
            Договора, Работник обязан уплатить штраф в следующих размерах:
          </p>
          <p>
            (i) в период срока действия настоящего Договора – 100 базовых
            расчетных величин. При этом, по усмотрению Работодателя в пределах,
            разрешенных в соответствии с законодательством Республики
            Узбекистан, сумма штрафа может быть удержана из заработной платы
            Работника;
          </p>
          <p>
            (ii) после прекращения трудовых отношений с Работодателем – 150
            базовых расчетных величин.
          </p>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">10.</div>
        <p className="fill">
          <b>ПРАВА НА ИНТЕЛЛЕКТУАЛЬНУЮ СОБСТВЕННОСТЬ</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">10.1</div>
        <p className="fill">
          Работник должен немедленно сообщать Работодателю в письменной форме
          обо всех идеях, ноу-хау, объектах прав интеллектуальной собственности,
          средствах индивидуализации, созданных Работником самостоятельно или
          совместно с другими лицами в течение действия настоящего Договора, и
          связанных с выполнением Работником инструкций Работодателя, работы в
          соответствии с его трудовыми функциями.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">10.2</div>
        <p className="fill">
          Исключительные права на любые объекты интеллектуальной собственности,
          созданные или спроектированные Работником, принадлежат Работодателю.
          Работодатель вправе получить патент на изобретение, полезную модель
          или промышленный образец, осуществить регистрацию средств
          индивидуализации, созданных Работником в процессе работы, связанной с
          исполнением своих трудовых обязанностей или конкретного задания
          Работодателя.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">11.</div>
        <p className="fill">
          <b>ОТВЕТСТВЕННОСТЬ СТОРОН</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">11.1</div>
        <p className="fill">
          В случае неисполнения или ненадлежащего исполнения Работником своих
          трудовых обязанностей, указанных в должностной инструкции и в
          настоящем Договоре, или в случае причинения материального ущерба
          Обществу, Работник несет дисциплинарную ответственность в соответствии
          с законодательством Республики Узбекистан.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">11.2</div>
        <p className="fill">
          Работник выплачивает Работодателю неустойку в размере 35 БРВ в течение
          10 (десяти) календарных дней, если трудовые отношения прекращены:
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">11.2.1.</div>
        <p className="fill">
          по инициативе Работника до окончания срока действия Договора;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">11.2.2.</div>
        <p className="fill">
          по основаниям, связанным с виновными действиями (бездействием)
          Работника;
        </p>
      </p>
      <p className="s-flex pl">
        <div className="number">11.2.3.</div>
        <p className="fill">
          в связи с нарушением со стороны Работника своих должностных
          обязанностей, предусмотренных п. 3.2 Договора и Приложения № 1 к
          Договору.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">11.3</div>
        <p className="fill">
          <p className="mb-space">
            Работодатель выплачивает Работнику неустойку в размере 35 БРВ в
            течение 10 (десяти) календарных дней, если
          </p>
          трудовые отношения прекращены по инициативе Работодателя по 6
          основаниям, не связанным с виновными действиями (бездействием)
          Работника (пункты 1-3 и 6 части второй ст. 161 Трудового кодекса
          Республики Узбекистан).
        </p>
      </p>
      <p className="s-flex">
        <div className="number">12.</div>
        <p className="fill">
          <b>ПРИМЕНИМОЕ ПРАВО И РАЗРЕШЕНИЕ СПОРОВ</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">12.1</div>
        <p className="fill">
          Настоящий Договор регулируется и толкуется в соответствии с
          законодательством Республики Узбекистан. Все вопросы, не
          урегулированные настоящим Договором, подлежат разрешению в
          соответствии с Правилами внутреннего трудового распорядка Работодателя
          и законодательством Республики Узбекистан.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">12.2</div>
        <p className="fill">
          Все разногласия между сторонами настоящего Договора разрешаются в
          порядке, установленном законодательством Республики Узбекистан.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.</div>
        <p className="fill">
          <b>ПРОЧИЕ ПОЛОЖЕНИЯ</b>
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.1</div>
        <p className="fill">
          Настоящий Договор заменяет любые иные договоренности и переписку между
          Работодателем и Работником по вопросам регулирования трудовых
          отношений между ними.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.2</div>
        <p className="fill">
          Условия настоящего Договора могут быть изменены только по взаимному
          соглашению сторон. Такие изменения оформляются в письменной форме,
          подписываются Работодателем и Работником и рассматриваются в качестве
          неотъемлемой части настоящего Договора.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.3</div>
        <p className="fill">
          <p>
            Если какое-либо из положений настоящего Договора будет признано
            несоответствующим законодательству Республики Узбекистан, это не
            будет означать недействительность остальных положений Договора или
            Договора в целом.
          </p>{" "}
          В таком случае Стороны должны заменить недействительное положение на
          положение, соответствующее законодательству Республики Узбекистан, и
          позволяющее в максимальной степени достичь первоначальный результат.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.4</div>
        <p className="fill">
          Настоящий Договор составлен в 2-х (двух) подлинных экземплярах, по
          одному экземпляру для каждой из Сторон.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.5</div>
        <p className="fill">
          Во избежание сомнений под Работодателем также понимается
          образовательный центр «INTER NATION ENGLISH SCHOOL».
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.6</div>
        <p className="fill">
          Стороны признают, что на территории Работодателя запрещена
          дискриминация и принудительный труд в какой-либо форме, в том числе не
          допускается проявлять действия харассмента на работе.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">13.7</div>
        <p className="fill">
          Стороны признают, что Работодатель вправе собирать доказательства (в
          том числе смс- сообщения, тексты, фотографии в мессенджерах,
          социальных сетях, разговоры IP- телефонии, видеонаблюдения, отпечатки
          пальцев) на рабочих телефонах либо компьютерах, являющимися
          собственностью Работодателя, в целях обеспечения безопасности на
          территории Работодателя и недопущения нарушения локальных актов и
          Договора.
        </p>
      </p>
      <p className="s-flex">
        <div className="number">14.</div>
        <p className="fill">
          <b>ПОДПИСИ СТОРОН</b>
        </p>
      </p>
      <p className="a-flex mb-space">
        <div>Работодатель</div>
        <div>Работник</div>
      </p>
      <p className="ag-flex">
        <div>
          <p>ООО «INTEST MAX»</p>
          <p>Номер и дата регистрации: 896254/23.01.2020 г.</p>
          <p>
            Адрес: г. Ташкент, Мирзо-Улугбекский район, поселок Улугбек, улица
            Шахрисабз, Буюк Ипак Йули, дом 1
          </p>
          <p>ИНН: 307058508</p>
          <p>Банковские реквизиты:</p>
          <p>р/с: 20208000705166775001</p>
          <p>АТИБ «Ипотека-банк» МФО: 00419</p>
          <p>Контактные данные:</p>
          <p>Тел: (78) 777-77-07</p>
          <p>E-mail: inter-nation@mail.ru</p>
          <p>____________________/ Косимов С.Р.</p>
        </div>
        <div>
          <p>ФИО: {data?.fullName}</p>
          <p>Паспорт/ID: {data?.passportNumber}</p>
          <p>Адрес: {data?.officialAddress}</p>
          <p>ИНН: {data?.inn}</p>
          <p>ПИНФЛ: {data?.pinfl}</p>
          <p>ИНПС: {data?.inps}</p>
          <p>Контактные данные: {data?.contact}</p>
          <p>
            Тел:{" "}
            {formatPhoneNumber(
              data?.user?.userPhones?.filter(
                (p: any) => p?.type === MainPhone,
              )[0]?.phone_number,
            )}
          </p>
          <p>E-mail: {data?.user?.email}</p>
          <p>____________________/</p>
        </div>
      </p>
      <div className="end" style={{ marginBottom: "10px" }}>
        Настоящий Договор подготовлен юридической фирмой «Sher Legal» в
        соответствии с законодательством Республики Узбекистан, действующим на
        дату составления.
      </div>
      <h1 className="c-title">ПРИЛОЖЕНИЕ №1</h1>
      <h1 className="c-title">ДОЛЖНОСТНЫЕ ОБЯЗАННОСТИ Оператор колл-центра</h1>
      <p>Администратор обязан:</p>
      <p className="s-flex">
        <div className="number">(A)</div>
        <p className="fill">
          Своевременно осваивать информацию по тарифам, услугам и акциям
          Работодателя;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(B)</div>
        <p className="fill">Носить бейджик на территории центра;</p>
      </p>
      <p className="s-flex">
        <div className="number">(C)</div>
        <p className="fill">Не пользоваться мобильными устройствами;</p>
      </p>
      <p className="s-flex">
        <div className="number">(D)</div>
        <p className="fill">
          Проверять список задач на день через платформу «Task»;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(E)</div>
        <p className="fill">
          Организовывать прием посетителей (студентов, учащихся) Общества (его
          филиала);
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(F)</div>
        <p className="fill">
          Принимать и общаться как с потенциальными, так и с действующими
          студентами строго по скрипту;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(G)</div>
        <p className="fill">
          Проводить презентацию посетителям (потенциальным студентам, учащимся)
          о возможностях обучения в Обществе (его филиале), а также тестировать
          и распределять их по группам обучения;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(H)</div>
        <p className="fill">
          Проверять уровень студентов с помощью онлайн теста и устного опроса;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(I)</div>
        <p className="fill">
          Находить студентам подходящую группу исходя из их времени, уровня и
          предпочтений;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(J)</div>
        <p className="fill">
          Провожать каждого студента до кабинета, где проводится занятие и лично
          знакомить их с учителем;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(K)</div>
        <p className="fill">
          Проверять список записанных студентов и обзванивать их, в случае если
          она не пришла на занятие;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(L)</div>
        <p className="fill">
          Отправлять ежедневные отчеты через платформу «Task» и специальную
          группу в Tелеграме;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(M)</div>
        <p className="fill">
          Соблюдать все условия локальных актов и придерживаться их;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(N)</div>
        <p className="fill">
          Взаимодействовать с учителями и осваивать детальную информацию о них
          для того, чтобы правильно направить студентов в подходящую группу;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(O)</div>
        <p className="fill">
          Принимать меры по предотвращению и ликвидации конфликтных ситуаций;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(P)</div>
        <p className="fill">
          Информировать руководство Общество об имеющихся недостатках в
          обслуживании посетителей, принимать меры по их ликвидации;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(Q)</div>
        <p className="fill">
          При возникновении вопросов, проблем или жалоб студентов принимать меры
          и решать их своевременно;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(R)</div>
        <p className="fill">
          Выполнять другие обязанности на основании локальных актов;
        </p>
      </p>
      <p className="s-flex">
        <div className="number">(S)</div>
        <p className="fill">
          При прекращении Договора по какой бы то ни было причине Работник
          обязан возвратить Работодателю все документы, книги, записи и любое
          иное имущество, принадлежащее Работодателю; Работник не вправе
          сохранять какие-либо копии указанных документов.
        </p>
      </p>
      <p>
        С должностными обязанностями ознакомлен (-а), принимаю их к исполнению:
      </p>
      <div className="c-flex">
        <div>
          <div>__________________________________</div>
          <div>(ФИО)</div>
        </div>
        <div>
          <div>___________________</div>
          <div>(подпись)</div>
        </div>
        <div> «___»__________ 20___г.</div>
      </div>
    </>
  );
};
