import express from 'express';
import db from '../app/models/index.js';
import { Op, Sequelize } from 'sequelize';
import dayjs from 'dayjs';
const { sequelize, Employee } = db;

const eduRouter = express.Router();

eduRouter.get('/api/edu', async (request, response, next) => {
  try {
    const fireDate = request.query.date;

    let result = null;

    // ----------------------------
    // 평문으로 실행하고 싶을 경우
    // ----------------------------
    // const sql = `SELECT * FROM employees WHERE fire_at >= ?`;
    // result = await sequelize.query(
    //   sql,
    //   {
    //     replacements: [fireDate],
    //     type: Sequelize.QueryTypes.SELECT
    //   }
    // );

    // ----------------------------
    // Model 메소드
    // ----------------------------
    // findAll() : 전체 조회
    // SELECT emp_id, name, birth FROM employees where emp_id BETWEEN 50 AND 100;
    // result = await Employee.findAll({ // 배열
    //   attributes: ['empId', 'name', 'birth'], // 조회할 컬럼 지정(SELECT 절)
    //   where: {
    //     empId: {
    //       [Op.between]: [50, 100]
    //     }
    //   }
    // });

    // findOne() : 조건에 맞는 첫번쨰 레코드 조회, 객체
    // result = await Employee.findOne({
    //   attributes: ['empId', 'name', 'birth'], // 조회할 컬럼 지정(SELECT 절)
    //   where: {
    //     empId: {
    //       [Op.between]: [50, 100]
    //     }
    //   }
    // });

    // findByPk(id, options) : PK 기준 단일 레코드 조회
    // SELECT emp_id, name WHERE employees WHERE emp_id = 500;
    // result = await Employee.findByPk(500, {
    //   attributes: ['empId', 'name'],
    // });

    // count(options), sum(field, options), mas(field, options), min(field, options), svg(field, options)
    // SELECT COUNT(*) WHERE employees WHERE deleted_at IS NULL;
    // result = await Employee.count();
    // 결과 값이 50055가 나오는 이유: models/Employee.js에서 options에서 Soft Delete 설정함
    // paranoid: false : deleted_at IS NOT NULL 설정해줌
    // result = await Employee.max('emp_id');

    // create(values, options) : 새 레코드 생성
    // result = await Employee.create({
    //   name: '테스트',
    //   birth: '2000-01-01',
    //   gender: 'F',
    //   hireAt: dayjs().format('YYYY-MM-DD'),
    // });

    // update(values, option) : 기존 레코드 수정 (영향 받은 레코드 수 반환)
    // UPDATE employees SET name = "미어캣" WHERE emp_id >= 100008;
    // result = await Employee.update(
    //   {
    //     name: '미어캣'
    //   }, 
    //   {
    //     where: {
    //       empId: 100008
    //     }
    //   }
    // );

    // save() : 모델 인스턴스를 기반으로 레코드 생성 및 수정
    // const employee = await Employee.findByPk(100008);
    // employee.name = '희동이';
    // employee.birth = '1990-01-01';
    // result = await employee.save();

    // save()를 이용한 새로운 데이터 생성
    // const employee = await Employee.build(); // 빈 모델 객체 인스턴스
    // employee.name = '또치';
    // employee.birth = '1980-01-01';
    // employee.gender = 'F';
    // employee.hireAt = dayjs().format('YYYY-MM-DD');
    // result = await employee.save();

    // ----------------------------------------
    // destroy(option) : 조건에 맞는 레코드 삭제
    // ----------------------------------------
    // models/Employee.js에서 options에서 Soft Delete 설정해서 물리적으로 삭제안됨
    // deleted_at의 값만 추가됨
    // result = await Employee.destroy({
    //   where: {
    //     empId: 100010
    //   }
    //   // , force: true // 모델에 'paranoid: true'일 경우에도, 물리적 사제를 위한 옵션
    // });

    // ---------------------------------------------
    // restore(option) : Soft Delete 된 레코드를 복원
    // ---------------------------------------------
    // result = await Employee.restore({
    //   where: {
    //     empId: 100009
    //   }
    // });

    // 이름이 '강가람'이고, 성별이 여자인 사원 정보 조회
    result = await Employee.findAll({
      attributes: ['emp_id', 'name', 'gender'],
      where: {
        name: '강가람',
        gender: 'F',
      }
    })

    // 이름이 '강가람' 또는 '신서연'인 사원 조회(OR)
    // result = await Employee.findAll({
    //   attributes: ['emp_id', 'name', 'gender'],
    //   where: {
    //     [Op.or]: [
    //       {name: '강가람'},
    //       {name: '신서연'}
    //     ]
    //   }
    // });

    // result = await Employee.findAll({
    //   attributes: ['emp_id', 'name', 'gender'],
    //   where: {
    //     [Op.and]: [
    //       {gender: 'F'},
    //       {
    //         [Op.or]: [
    //           {name: '강가람'},
    //           {name: '신서연'}
    //         ]
    //       }
    //     ]        
    //   }
    // });

    // result = await Employee.findAll({
    //   where: {
    //     // empId: {
    //     //   // [Op.between]: [1, 100]
    //     //   // [Op.notBetween]: [1, 100]
    //     //   [Op.in]: [1, 3, 5]
    //     //   // [Op.notIn]: [1, 3, 5]
    //     // },
    //     name: {
    //       [Op.like]: '%가람'
    //       // [Op.iLike]: '%가람' // 대소문자 무시
    //     },
    //     fireAt: {
    //       // null 조건
    //       [Op.is]: null
    //       // [Op.not]: null
    //     }
    //   }
    // });

    // SELECT * FROM Employee WHERE emp_id >= 10000 ORDER BY name ASC, birth DESC LIMIT 10 OFFSET 10;
    // result = await Employee.findAll({
    //   where: {
    //     emp_id: {
    //       [Op.gte]: 10000
    //     }
    //   },
    //   order: [
    //     ['name', 'ASC'],
    //     ['birth', 'DESC'],
    //   ],
    //   limit: 10,
    //   offset: 10,
    // });

    // groupby, having
    result = await Employee.findAll({
      attributes: [
        'gender', 
        [sequelize.fn('COUNT', sequelize.col('*')), 'cnt_gender']
      ],
      group: ['gender'],
      having: sequelize.literal('cnt_gender >= 40000'),
    });

    return response.status(200).send({
      msg: '정상 처리',
      data: result
    })

  } catch (error) {
    next(error);
  }
});

export default eduRouter;