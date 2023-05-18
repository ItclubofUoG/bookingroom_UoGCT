<?php

namespace App\Repository;

use App\Entity\Schedule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Result;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Schedule>
 *
 * @method Schedule|null find($id, $lockMode = null, $lockVersion = null)
 * @method Schedule|null findOneBy(array $criteria, array $orderBy = null)
 * @method Schedule[]    findAll()
 * @method Schedule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScheduleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Schedule::class);
    }

    public function save(Schedule $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Schedule $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

   /**
    * @return Schedule[] Returns an array of Schedule objects
    */
   public function findScheduleAndReservation($day,$from,$to): array
   {
    $conn = $this->getEntityManager()->getConnection();
    $sql = '
        SELECT `room_id`, `date`, `class`, `slot`, r.`name`, room_id as mssv
        FROM `schedule` s LEFT JOIN `room` r ON s.room_id = r.id
        WHERE r.id>=:from AND r.id<=:to AND s.date = :day
        UNION
        SELECT  u.fullname, `date`,`status`,`slot`, r.name, u.mssv_cb as mssv
        FROM `reservation` re INNER JOIN `user` u ON re.user_id = u.id
        INNER JOIN `room` r ON re.room_id = r.id
        WHERE re.date = :day
    ';
    $re = $conn->executeQuery($sql,['day'=>$day,'from'=>$from,'to'=>$to]);

    return $re->fetchAllAssociative();
   }

//    /**
//     * @return Schedule[] Returns an array of Schedule objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Schedule
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
