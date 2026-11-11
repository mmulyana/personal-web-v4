import type { BundledLanguage } from 'shiki'

export interface Snippet {
  title: string
  lang: BundledLanguage
  // Judul grup di sidebar; terpisah dari lang karena pattern ditulis dalam C#.
  group: string
  code: string
}

const go: Snippet[] = [
  {
    title: '1. Variabel & konstanta',
    lang: 'go',
    group: 'Go',
    code: `package main

import "fmt"

const Pi = 3.14

const (
    Low = iota
    Mid
    High
)

func main() {
    var name string = "go"
    age := 30
    fmt.Println(name, age, Pi, High)
}`,
  },
  {
    title: '2. Loop for',
    lang: 'go',
    group: 'Go',
    code: `func main() {
    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }

    n := 0
    for n < 3 {
        n++
    }

    for i, v := range []string{"a", "b"} {
        fmt.Println(i, v)
    }
}`,
  },
  {
    title: '3. If & switch',
    lang: 'go',
    group: 'Go',
    code: `func classify(score int) string {
    switch {
    case score >= 80:
        return "A"
    case score >= 60:
        return "B"
    default:
        return "C"
    }
}

func parse(s string) {
    if n, err := strconv.Atoi(s); err == nil {
        fmt.Println(n)
    }
}`,
  },
  {
    title: '4. Slice',
    lang: 'go',
    group: 'Go',
    code: `func main() {
    nums := []int{1, 2, 3}
    nums = append(nums, 4, 5)
    part := nums[1:3]

    dup := make([]int, len(nums))
    copy(dup, nums)

    fmt.Println(len(nums), cap(nums), part, dup)
}`,
  },
  {
    title: '5. Map',
    lang: 'go',
    group: 'Go',
    code: `func main() {
    ages := map[string]int{"ani": 20}
    ages["budi"] = 25

    if age, ok := ages["citra"]; !ok {
        fmt.Println("tidak ada", age)
    }

    delete(ages, "ani")
    for name, age := range ages {
        fmt.Println(name, age)
    }
}`,
  },
  {
    title: '6. Fungsi',
    lang: 'go',
    group: 'Go',
    code: `func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("bagi nol")
    }
    return a / b, nil
}

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func counter() func() int {
    c := 0
    return func() int {
        c++
        return c
    }
}`,
  },
]

const ruby: Snippet[] = [
  {
    title: '1. Block do |x|',
    lang: 'ruby',
    group: 'Ruby',
    code: `[1, 2, 3].each do |n|
  puts n * 2
end

[1, 2, 3].each { |n| puts n * 2 }

{ a: 1, b: 2 }.each do |key, value|
  puts "#{key}=#{value}"
end`,
  },
  {
    title: '2. map, select, reduce',
    lang: 'ruby',
    group: 'Ruby',
    code: `names = %w[ani budi citra]

names.map(&:upcase)
names.select { |n| n.length > 3 }
names.each_with_index.map { |n, i| "#{i + 1}. #{n}" }
[1, 2, 3].reduce(0) { |sum, n| sum + n }
[1, 2, 3].sum`,
  },
  {
    title: '3. yield',
    lang: 'ruby',
    group: 'Ruby',
    code: `def twice
  return unless block_given?

  yield
  yield
end

def with_log(label)
  puts "mulai #{label}"
  result = yield
  puts "selesai #{label}"
  result
end

with_log("hitung") { 1 + 1 }`,
  },
  {
    title: '4. Symbol & hash',
    lang: 'ruby',
    group: 'Ruby',
    code: `user = { name: "Ani", role: :admin, age: 20 }

puts user[:name]
puts "admin" if user[:role] == :admin
puts "dewasa" unless user[:age] < 18

user.each_pair { |k, v| puts "#{k}: #{v}" }
user.fetch(:email, "-")`,
  },
  {
    title: '5. ?, !, ||=, &.',
    lang: 'ruby',
    group: 'Ruby',
    code: `def adult?(age)
  age >= 18
end

def normalize!(text)
  text.strip!
  text.downcase!
end

name = nil
name ||= "guest"
puts name&.upcase

case name
when "guest" then puts "tamu"
when /^a/ then puts "huruf a"
else puts "lain"
end`,
  },
  {
    title: '6. Class & attr_accessor',
    lang: 'ruby',
    group: 'Ruby',
    code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def to_s
    "#{name} (#{age})"
  end
end

puts Person.new("Ani", 20)`,
  },
]

const csharp: Snippet[] = [
  {
    title: '1. Hello World',
    lang: 'csharp',
    group: 'C#',
    code: `using System;

Console.WriteLine("Halo, dunia!");
Console.Write("Nama: ");
var name = Console.ReadLine();
Console.WriteLine("Halo, " + name);`,
  },
  {
    title: '2. Variabel & interpolasi',
    lang: 'csharp',
    group: 'C#',
    code: `var name = "Ani";
int age = 20;
double price = 9.5;
bool active = true;
const int Max = 100;

Console.WriteLine($"{name} berumur {age} tahun");
Console.WriteLine($"Harga: {price:F2}");`,
  },
  {
    title: '3. If & switch',
    lang: 'csharp',
    group: 'C#',
    code: `var score = 75;

if (score >= 80)
{
    Console.WriteLine("A");
}
else if (score >= 60)
{
    Console.WriteLine("B");
}

var grade = score switch
{
    >= 80 => "A",
    >= 60 => "B",
    _ => "C",
};`,
  },
  {
    title: '4. Loop',
    lang: 'csharp',
    group: 'C#',
    code: `for (var i = 0; i < 3; i++)
{
    Console.WriteLine(i);
}

var names = new[] { "ani", "budi" };
foreach (var name in names)
{
    Console.WriteLine(name);
}

var n = 0;
while (n < 3)
{
    n++;
}`,
  },
  {
    title: '5. List & Dictionary',
    lang: 'csharp',
    group: 'C#',
    code: `var nums = new List<int> { 1, 2, 3 };
nums.Add(4);
nums.Remove(1);

var ages = new Dictionary<string, int>
{
    ["ani"] = 20,
    ["budi"] = 25,
};

if (ages.TryGetValue("ani", out var age))
{
    Console.WriteLine(age);
}`,
  },
  {
    title: '6. Method',
    lang: 'csharp',
    group: 'C#',
    code: `static int Add(int a, int b)
{
    return a + b;
}

static string Greet(string name, string greeting = "Halo")
    => $"{greeting}, {name}!";

Console.WriteLine(Add(2, 3));
Console.WriteLine(Greet("Ani"));
Console.WriteLine(Greet(greeting: "Hai", name: "Budi"));`,
  },
]

const patterns: Snippet[] = [
  {
    title: 'Singleton',
    lang: 'csharp',
    group: 'Patterns',
    code: `public sealed class AppConfig
{
    private static readonly Lazy<AppConfig> instance =
        new(() => new AppConfig());

    private AppConfig() { }

    public static AppConfig Instance => instance.Value;

    public string Env { get; set; } = "dev";
}`,
  },
  {
    title: 'Factory Method',
    lang: 'csharp',
    group: 'Patterns',
    code: `public interface INotifier
{
    void Send(string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"Email: {message}");
}

public class SmsNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"SMS: {message}");
}

public static class NotifierFactory
{
    public static INotifier Create(string type) => type switch
    {
        "email" => new EmailNotifier(),
        "sms" => new SmsNotifier(),
        _ => throw new ArgumentException("tipe tidak dikenal"),
    };
}`,
  },
  {
    title: 'Builder',
    lang: 'csharp',
    group: 'Patterns',
    code: `public class Pizza
{
    public string Size { get; set; } = "medium";
    public List<string> Toppings { get; } = new();
}

public class PizzaBuilder
{
    private readonly Pizza pizza = new();

    public PizzaBuilder Size(string size)
    {
        pizza.Size = size;
        return this;
    }

    public PizzaBuilder AddTopping(string topping)
    {
        pizza.Toppings.Add(topping);
        return this;
    }

    public Pizza Build() => pizza;
}`,
  },
  {
    title: 'Strategy',
    lang: 'csharp',
    group: 'Patterns',
    code: `public interface IDiscount
{
    decimal Apply(decimal price);
}

public class NoDiscount : IDiscount
{
    public decimal Apply(decimal price) => price;
}

public class PercentDiscount(decimal percent) : IDiscount
{
    public decimal Apply(decimal price) => price - price * percent / 100;
}

public class Checkout(IDiscount discount)
{
    public decimal Total(decimal price) => discount.Apply(price);
}`,
  },
  {
    title: 'Observer',
    lang: 'csharp',
    group: 'Patterns',
    code: `var stock = new Stock();
stock.PriceChanged += (symbol, price) =>
    Console.WriteLine($"{symbol}: {price}");
stock.SetPrice("BBCA", 9500m);

public class Stock
{
    public event Action<string, decimal>? PriceChanged;

    public void SetPrice(string symbol, decimal value)
    {
        PriceChanged?.Invoke(symbol, value);
    }
}`,
  },
]

export const snippets: Snippet[] = [...go, ...ruby, ...csharp, ...patterns]
